from django.db import models
from users.models import InstagramUser


class Following(models.Model):
    """Модель, показывающая кто(follower) кого(following) отслеживает"""

    follower = models.ForeignKey(InstagramUser, related_name='following_relations', on_delete=models.CASCADE)
    following = models.ForeignKey(InstagramUser, related_name='follower_relations',on_delete=models.CASCADE)
    is_blocked = models.BooleanField(default=False)

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'


class PostLikes(models.Model):
    """Модель, показывающая кому(user) какой пост(post) понравился"""

    user = models.ForeignKey(InstagramUser, on_delete=models.CASCADE)
    post = models.ForeignKey('Posts', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} to {self.post}'


class Posts(models.Model):
    """Модель, представляющая публикации"""

    author = models.ForeignKey(InstagramUser, related_name='posts', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts_images/%Y/%m/%d', blank=False, null=False)
    description = models.TextField(blank=True)


class CommentLikes(models.Model):
    """Модель показывающая кому(user) какой комментарий(comment) понравился"""

    user = models.ForeignKey(InstagramUser, on_delete=models.CASCADE)
    comment = models.ForeignKey('Comments', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} to {self.comment}'


class Comments(models.Model):
    """Модель, представляющая комментарии"""

    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    author = models.ForeignKey(InstagramUser, on_delete=models.CASCADE)
    text = models.TextField(blank=False)

    def __str__(self):
        return self.text