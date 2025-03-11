import mimetypes
from django.conf import settings

mimetypes.add_type("image/webp", ".webp", strict=True)

class ContentTypeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.path.startswith(settings.MEDIA_URL):
            mime_type, _ = mimetypes.guess_type(request.path)
            if mime_type:
                response['Content-Type'] = mime_type
        return response
