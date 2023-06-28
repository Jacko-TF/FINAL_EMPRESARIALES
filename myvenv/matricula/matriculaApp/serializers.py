from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Estudiante, Semestre, Seccion, Ciclo, Departamento, Carrera, Curso, Matricula, Pago
from django.core.exceptions import ValidationError

#APLICACION MATRICULA

class EstudianteSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:estudiante-detail")
    class Meta:
        model = Estudiante
        fields = ['id','url','nombre','apellido','fecha_nacimiento','direccion','dni','telefono','certificado']

class SemestreSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:semestre-detail")
    class Meta:
        model = Semestre
        fields = ['id','url','nombre','fecha_inicio','fecha_final']

class CicloSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:ciclo-detail")
    semestre = SemestreSerializer()
    class Meta:
        model = Ciclo
        fields = ['id','url','nombre','semestre']

class DepartamentoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:departamento-detail")
    class Meta:
        model = Departamento
        fields = ['id','url','nombre']

class CarreraSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:carrera-detail")
    departamento = DepartamentoSerializer()
    class Meta:
        model = Carrera
        fields = ['id','url','nombre','departamento']

class SeccionSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:seccion-detail")
    ciclo = CicloSerializer()
    class Meta:
        model = Seccion
        fields = ['id','url','nombre','ciclo']

class CursoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:curso-detail")
    seccion = SeccionSerializer()
    class Meta:
        model = Curso
        fields = ['id','url','nombre','descripcion','credito','cupos','horas','seccion']

class MatriculaSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:matricula-detail")
    estudiante = EstudianteSerializer()
    carrera = CarreraSerializer()
    seccion = SeccionSerializer()
    class Meta:
        model = Matricula
        fields = ['id','url','fecha','estudiante','carrera','seccion']

class PagoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:pago-detail")
    matricula = MatriculaSerializer()
    class Meta:
        model = Pago
        fields = ['id','url','monto','estado','fecha_creacion','fecha_vencimiento','fecha_pago','penalidad','matricula']