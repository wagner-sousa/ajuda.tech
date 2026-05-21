"""
Testes unitários para chat.models (Conversation e Message).
Metodologia: TDD — escritos antes da implementação dos models.
"""

import pytest
from django.utils import timezone


@pytest.mark.django_db
class TestConversationModel:
    def test_create_conversation_with_session_key(self):
        from chat.models import Conversation
        conv = Conversation.objects.create(session_key="abc123")
        assert conv.session_key == "abc123"

    def test_session_key_is_unique(self):
        from chat.models import Conversation
        from django.db import IntegrityError
        Conversation.objects.create(session_key="unique-key")
        with pytest.raises(IntegrityError):
            Conversation.objects.create(session_key="unique-key")

    def test_is_completed_defaults_to_false(self):
        from chat.models import Conversation
        conv = Conversation.objects.create(session_key="sess-001")
        assert conv.is_completed is False

    def test_created_at_is_set_automatically(self):
        from chat.models import Conversation
        before = timezone.now()
        conv = Conversation.objects.create(session_key="sess-002")
        after = timezone.now()
        assert before <= conv.created_at <= after

    def test_updated_at_changes_on_save(self):
        from chat.models import Conversation
        import time
        conv = Conversation.objects.create(session_key="sess-003")
        original_updated = conv.updated_at
        time.sleep(0.01)
        conv.is_completed = True
        conv.save()
        conv.refresh_from_db()
        assert conv.updated_at > original_updated

    def test_string_representation(self):
        from chat.models import Conversation
        conv = Conversation.objects.create(session_key="sess-str")
        assert "sess-str" in str(conv)

    def test_get_history_returns_list_of_role_content_dicts(self):
        from chat.models import Conversation, Message
        conv = Conversation.objects.create(session_key="sess-hist")
        Message.objects.create(conversation=conv, role="user", content="Oi")
        Message.objects.create(conversation=conv, role="assistant", content="Olá!")
        history = conv.get_history()
        assert isinstance(history, list)
        assert history[0] == {"role": "user", "content": "Oi"}
        assert history[1] == {"role": "assistant", "content": "Olá!"}

    def test_get_history_is_ordered_by_created_at(self):
        from chat.models import Conversation, Message
        conv = Conversation.objects.create(session_key="sess-order")
        m1 = Message.objects.create(conversation=conv, role="user", content="primeiro")
        m2 = Message.objects.create(conversation=conv, role="assistant", content="segundo")
        history = conv.get_history()
        assert history[0]["content"] == "primeiro"
        assert history[1]["content"] == "segundo"

    def test_get_history_empty_when_no_messages(self):
        from chat.models import Conversation
        conv = Conversation.objects.create(session_key="sess-empty")
        assert conv.get_history() == []


@pytest.mark.django_db
class TestMessageModel:
    @pytest.fixture
    def conversation(self):
        from chat.models import Conversation
        return Conversation.objects.create(session_key="msg-test")

    def test_create_user_message(self, conversation):
        from chat.models import Message
        msg = Message.objects.create(
            conversation=conversation, role="user", content="teste"
        )
        assert msg.role == "user"

    def test_create_assistant_message(self, conversation):
        from chat.models import Message
        msg = Message.objects.create(
            conversation=conversation, role="assistant", content="resposta"
        )
        assert msg.role == "assistant"

    def test_role_choices_are_defined(self):
        from chat.models import Message
        choices_values = [c[0] for c in Message.ROLE_CHOICES]
        assert "user" in choices_values
        assert "assistant" in choices_values

    def test_message_is_linked_to_conversation(self, conversation):
        from chat.models import Message
        msg = Message.objects.create(
            conversation=conversation, role="user", content="link"
        )
        assert msg.conversation == conversation

    def test_messages_accessible_via_reverse_relation(self, conversation):
        from chat.models import Message
        Message.objects.create(conversation=conversation, role="user", content="a")
        Message.objects.create(conversation=conversation, role="assistant", content="b")
        assert conversation.messages.count() == 2

    def test_cascade_deletes_messages_with_conversation(self, conversation):
        from chat.models import Conversation, Message
        conv_pk = conversation.pk
        Message.objects.create(conversation=conversation, role="user", content="x")
        conversation.delete()
        assert Message.objects.filter(conversation_id=conv_pk).count() == 0

    def test_string_representation(self, conversation):
        from chat.models import Message
        msg = Message.objects.create(
            conversation=conversation, role="user", content="conteúdo de teste"
        )
        result = str(msg)
        assert "user" in result or "conteúdo" in result
