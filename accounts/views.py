
from rest_framework import generics, permissions


from . import models
from . import serializers
# Create your views here.



class ProfileListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return models.Profile.objects.filter(user=user)
