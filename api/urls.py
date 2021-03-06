from django.urls import include, path



urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('user/patients/', include('patients.urls')),
    path('accounts/', include('accounts.urls')),
]
