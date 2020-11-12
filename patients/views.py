import os

from rest_framework import generics, permissions
from twilio.rest import Client

from . import models
from . import serializers


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


class DoseListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.DoseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        prescription = self.kwargs.get('pk')
        return models.Dose.objects.filter(prescription=prescription)

    def perform_create(self, serializer):
        # import pdb; pdb.set_trace()


        if self.request.data.get('prescription'):
            # import pdb; pdb.set_trace()
            account_sid = os.environ['TWILIO_ACCOUNT_SID']
            auth_token = os.environ['TWILIO_AUTH_TOKEN']
            client = Client(account_sid, auth_token)

            message = client.messages \
                .create(
                     body= "has been given!",
                     from_='+12314621486',
                     to='+19192190994'
                 )

            print(message.sid)

        serializer.save()

class ProfileListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return models.Profile.objects.filter(user=user)



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
# class PrescriptionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Prescription.objects.all()
#     serializer_class = PrescriptionSerializer
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
