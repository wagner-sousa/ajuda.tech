from django.db import models


class Conversation(models.Model):
    session_key = models.CharField(
        max_length=40,
        unique=True,
        db_index=True,
        help_text="Chave de sessão Django (request.session.session_key).",
    )
    is_completed = models.BooleanField(
        default=False,
        help_text="True quando o usuário recebeu a recomendação final.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Conversa"
        verbose_name_plural = "Conversas"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"Conversa {self.session_key} ({'concluída' if self.is_completed else 'ativa'})"

    def get_history(self) -> list[dict]:
        """Retorna o histórico como lista de dicts {role, content} ordenados por criação."""
        return list(
            self.messages.values("role", "content").order_by("created_at")
        )


class Message(models.Model):
    ROLE_CHOICES = [
        ("user", "Usuário"),
        ("assistant", "Assistente"),
    ]

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Mensagem"
        verbose_name_plural = "Mensagens"
        ordering = ["created_at"]

    def __str__(self) -> str:
        preview = self.content[:50]
        return f"[{self.role}] {preview}"
