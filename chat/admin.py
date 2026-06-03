from django.contrib import admin

# Registro de modelos desativado — a aplicação utiliza request.session.

"""
from chat.models import Conversation, Message

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("session_key", "is_completed", "created_at", "updated_at")
    list_filter = ("is_completed",)
    search_fields = ("session_key",)
    readonly_fields = ("created_at", "updated_at")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("conversation", "role", "content_preview", "created_at")
    list_filter = ("role",)
    search_fields = ("content",)
    readonly_fields = ("created_at",)

    def content_preview(self, obj):
        return obj.content[:80]
    content_preview.short_description = "Conteúdo"
"""
