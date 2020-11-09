from django.urls import path


from .views import PatientListAPIView, PatientDetailAPIView, PrescriptionListAPIView, PrescriptionDetailAPIView

urlpatterns = [
    path('prescription/<int:pk>/', PrescriptionDetailAPIView.as_view(), name='prescription_list'),
    path('prescriptions/<int:pk>/', PrescriptionListAPIView.as_view(), name='prescription_list'),
    path('<int:pk>/', PatientDetailAPIView.as_view(), name='patient_list'),
    path('', PatientListAPIView.as_view(), name='patient_list'),

]
