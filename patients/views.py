import os
import sys
from django.contrib.auth import get_user_model
from accounts.models import Profile
from django.shortcuts import get_object_or_404
sys.path.append('accounts')

from rest_framework import generics, permissions
from twilio.rest import Client

from . import models
from . import serializers

User = get_user_model()


class PatientListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.PatientSerializer
    permission_classes = (permissions.IsAuthenticated,)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return models.Patient.objects.filter(user=user)


class PatientDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PatientSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return models.Patient.objects.filter(user=user)


class PrescriptionListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.PrescriptionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        patient = self.kwargs.get('pk')
        return models.Prescription.objects.filter(patient=patient)

class PrescriptionHistoryListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.DoseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        prescription = self.kwargs.get('pk')
        return models.Dose.objects



class DoseListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.DoseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        prescription = self.kwargs.get('pk')
        return models.Dose.objects.filter(prescription=prescription)

    def perform_create(self, serializer):
        # import pdb; pdb.set_trace()

        if self.request.data.get('prescription'):

            prescription = get_object_or_404(models.Prescription, id=self.request.data.get('prescription'))
            comments = self.request.data.get('comments')
            datetime = self.request.data.get('datetime')
            number = prescription.patient.user.profile.phone_number
            # import pdb; pdb.set_trace()
            # for y in Profile.objects.all():
            #     phone_number = y.phone_number
            account_sid = os.environ['TWILIO_ACCOUNT_SID']
            auth_token = os.environ['TWILIO_AUTH_TOKEN']
            client = Client(account_sid, auth_token)
            phone_number = Profile.phone_number
            message = client.messages \
                .create(
                     body= prescription.medication_name + comments + datetime,
                     from_='+12314621486',
                     to = number
                 )

            print(message.sid)

        serializer.save()


class PrescriptionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Prescription.objects.all()
    serializer_class = serializers.PrescriptionSerializer


class CaregiverListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.CaregiverSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        return models.User.objects.exclude(id=self.request.user.id)

# def job():
#
#     for y in Profile.objects.all():
#         phone_number = y.phone_number
#         print(phone_number)
# job()


# # Create your views here.
# class PatientListAPIView(generics.ListCreateAPIView):
#     # queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
#
#     def get_queryset(self):
#         user = self.request.user
#         return Patient.objects.filter(user=user)
#
# class PatientDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer
#
#
# class PrescriptionListAPIView(generics.ListCreateAPIView):
#     # queryset = Prescription.objects.all()
#     serializer_class = PrescriptionSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
#
#     def get_queryset(self):
#         # user = self.request.user
#         # import pdb; pdb.set_trace()
#         # kwargs is equal to {'pk': 15}
#         patient = self.kwargs.get('pk')
#         return Prescription.objects.filter(patient=patient)
#

#
# class DoseListAPIView(generics.ListCreateAPIView):
#     serializer_class = DoseSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
# class DoseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Dose.objects.all()
#     serializer_class = PrescriptionSerializer
#
#     def get_querset(self):
#         patient = self.kwargs.get('pk')
#         return Prescription.objects.filter(patient=patient)
