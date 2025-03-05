from django.db import models
from django.contrib.auth.models import AbstractUser


class InstagramUser(AbstractUser):
    """Модель пользователя"""

    image = models.ImageField(upload_to='users_images/%Y/%m/%d/', default='users_images/depositphotos_133352152-stock-illustration-default-placeholder-profile-icon.jpg', blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.username