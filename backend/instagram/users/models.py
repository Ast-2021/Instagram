from django.db import models
from django.contrib.auth.models import AbstractUser


class InstagramUser(AbstractUser):
    """Модель пользователя"""

    image = models.ImageField(upload_to='users_images/%Y/%m/%d/', default='users_images/depositphotos_133352152-stock-illustration-default-placeholder-profile-icon.jpg', blank=True)
    status = models.CharField(max_length=255, default='', blank=True)

    def __str__(self):
        return self.username
    

class Relations(models.Model):
    """Модель, показывающая кто(follower) кого(following) отслеживает"""

    follower = models.ForeignKey(InstagramUser, related_name='following_relations', on_delete=models.CASCADE)
    following = models.ForeignKey(InstagramUser, related_name='follower_relations',on_delete=models.CASCADE)

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'