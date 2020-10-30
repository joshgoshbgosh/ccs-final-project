from django.urls import  include, path

app_name = 'api'

urlpatterns = [
    # https://django-rest-auth.readthedocs.io/en/latest/installation.html
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
