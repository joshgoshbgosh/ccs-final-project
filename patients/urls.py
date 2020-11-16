from django.urls import path


from . import views

urlpatterns = [
    # returns prescriptions by patient id
    path('<int:pk>/prescriptions/', views.PrescriptionListAPIView.as_view()),
    # returns doses by prescription id
    path('<int:pk>/doses/', views.DoseListAPIView.as_view()),
    path('<int:pk>/prescriptionHistory/', views.PrescriptionHistoryListAPIView.as_view()),
    # returns patients based on user id
    path('<int:pk>/', views.PatientDetailAPIView.as_view()),
    path('', views.PatientListAPIView.as_view()),

    path('prescriptions/<int:pk>/', views.PrescriptionDetailAPIView.as_view()),


]
