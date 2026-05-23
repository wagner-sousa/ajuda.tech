"""
Hierarquia de exceções do módulo chat.

Todas as exceções derivam de OpenRouterError para permitir captura genérica
ou específica conforme necessário.
"""


class OpenRouterError(Exception):
    """Exceção base para todas as falhas relacionadas ao OpenRouter."""


class AuthenticationError(OpenRouterError):
    """Chave de API ausente, inválida ou sem permissão (HTTP 401/403)."""


class RateLimitError(OpenRouterError):
    """Limite de requisições excedido (HTTP 429)."""

    def __init__(self, message: str, retry_after: int = 10):
        super().__init__(message)
        self.retry_after = retry_after


class ServiceUnavailableError(OpenRouterError):
    """API indisponível, timeout ou erro de rede (HTTP 5xx, Timeout, ConnectionError)."""


class InvalidResponseError(OpenRouterError):
    """A resposta da API não pôde ser interpretada (JSON inválido, estrutura inesperada)."""
