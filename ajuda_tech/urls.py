from django.urls import path, include

urlpatterns = [
    path("", include("core.urls")),
    path("chat/", include("chat.urls")),
]
