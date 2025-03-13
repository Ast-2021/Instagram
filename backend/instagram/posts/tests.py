import json
import tempfile
import shutil
from django.test import TestCase, Client, override_settings
from django.urls import reverse
from instagram.settings import MEDIA_ROOT
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import *


TEMP_MEDIA_ROOT = tempfile.mkdtemp()

@override_settings(MEDIA_ROOT=TEMP_MEDIA_ROOT)
class TestViews(TestCase):
    """Тестирования представлений приложения posts"""

    def setUp(self):
        self.client = Client()

        self.author_1 = InstagramUser.objects.create_user(username='test_user', password='test_password')

        test_image = SimpleUploadedFile(name="anna1.png", content=b"fake image content", content_type="image/png")

        self.post_1 = Posts.objects.create(
            author=self.author_1,
            image=test_image, 
            description='France woman'
            )
        self.post_2 = Posts.objects.create(
            author=self.author_1,
            image=test_image,
            description='British chess'
        )

        self.comment_1 = Comments.objects.create(post=self.post_1, 
                                                 author=self.author_1, 
                                                 text='first_comment')

        self.url_posts_home = reverse('list')
        self.url_post = reverse('post', args=[self.post_1.pk])
        self.url_post_update = reverse('post_update', args=[self.post_1.pk])
        self.url_token = reverse('token')
        self.url_post_delete = reverse('post_delete', args=[self.post_1.pk])
        self.url_post_create = reverse('post_create')
        self.url_comment = reverse('comment', args=[self.comment_1.pk])
        self.url_create_comment = reverse('create_comment', args=[self.post_1.pk])
        self.url_create_like_of_post = reverse('post_add_or_remove_like', args=[self.post_1.pk])
        self.url_create_like_of_comment = reverse('comment_add_or_remove_like', args=[self.comment_1.pk])

        self.token = self.client.post(self.url_token, data={
            'username': self.author_1.username,
            'password': 'test_password'
            }, content_type='application/json').data
        

    def tearDown(self):
        shutil.rmtree(TEMP_MEDIA_ROOT, ignore_errors=True)


    def test_post_list_view(self):
        """Тестирования представления для получения всех публикаций"""
        response = self.client.get(self.url_posts_home)

        self.assertEqual(response.status_code, 200)

    
    def test_post_retrieve_view(self):
        """Тестирование представления для получения публикации и её комментариев"""
        response = self.client.get(self.url_post)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['image'], f'/media/{self.post_1.image}')
        self.assertEqual(response.data['description'], self.post_1.description)
        self.assertNotEqual(response.data['image'], f'http://testserver/media{self.post_2.image}')


    def test_post_update_view(self):
        """Тестирование представления для изменения публикации"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
            'Content-Type': 'application/json'
        }
        data = {'description': 'updated_post'}
        response = self.client.patch(self.url_post_update, data=json.dumps(data), headers=headers)

        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.url_post)

        self.assertEqual(data['description'], response.data['description'])


    def test_post_delete_view(self):
        """Тестирование представления для удаления публикации"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
        }
        response = self.client.delete(self.url_post_delete, headers=headers)

        self.assertEqual(response.status_code, 204)
        
        response = self.client.get(self.url_post)

        self.assertEqual(response.status_code, 404)

    
    def test_post_create_view(self):
        """Тестирование представления для создания публикации"""
        image_path = f'{MEDIA_ROOT}\\posts_images\\2025\\03\\11\\anna.png'
        with open(image_path, 'rb') as image_file:
            response = self.client.post(
            self.url_post_create,
            data={'image': image_file, 'description': 'created_post'},
            HTTP_AUTHORIZATION=f'Bearer {self.token["access"]}'
            )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Posts.objects.count(), 3)

    
    def test_comment_retrieve_update_destroy_view(self):
        """Тестирование представления для удаление комментариев"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
            'Content-Type': 'application/json'
        }
        response = self.client.delete(self.url_comment, headers=headers)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Comments.objects.count(), 0)


    def test_comment_create_view(self):
        """Тестирование представления для создания комментариев"""
        data = {'text': 'second_comment'}
        response = self.client.post(self.url_create_comment, data=data, HTTP_AUTHORIZATION=f'Bearer {self.token["access"]}')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Comments.objects.count(), 2)


    def test_post_likes_view(self):
        """Тестирование представления для создания или удаления лайков"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
        }
        response_1 = self.client.post(self.url_create_like_of_post, headers=headers)

        self.assertEqual(response_1.status_code, 201)
        self.assertEqual(PostLikes.objects.count(), 1)

        response_2 = self.client.delete(self.url_create_like_of_post, headers=headers)

        self.assertEqual(response_2.status_code, 204)
        self.assertEqual(PostLikes.objects.count(), 0)


    def test_comment_likes_view(self):
        """Тестирование представления для создания и удаления лайков"""
        headers = {
            'Authorization': f'Bearer {self.token["access"]}',
        }
        response_1 = self.client.post(self.url_create_like_of_comment, headers=headers)

        self.assertEqual(response_1.status_code, 201)
        self.assertEqual(CommentLikes.objects.count(), 1)

        response_2 = self.client.delete(self.url_create_like_of_comment, headers=headers)

        self.assertEqual(response_2.status_code, 204)
        self.assertEqual(CommentLikes.objects.count(), 0)