from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Estudiante, Semestre, Seccion, Ciclo, Departamento, Carrera, Curso, Matricula, Pago
from django.core.exceptions import ValidationError
from django.db import models

#APLICACION MATRICULA

class EstudianteSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:estudiante-detail")
    class Meta:
        model = Estudiante
        fields = ['id','url','nombre','apellido','fecha_nacimiento','direccion','dni','telefono']

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
    carrera = CarreraSerializer()
    class Meta:
        model = Seccion
        fields = ['id','url','nombre','cupos','ciclo','carrera']

class CursoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:curso-detail")
    seccion = SeccionSerializer()
    class Meta:
        model = Curso
        fields = ['id','url','nombre','descripcion','credito','horas','seccion']

class MatriculaSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:matricula-detail")
    estudiante = EstudianteSerializer()
    seccion = SeccionSerializer()
    class Meta:
        model = Matricula
        fields = ['id','url','fecha','estudiante','seccion']

class PagoSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="matriculaApp:pago-detail")
    matricula = MatriculaSerializer()
    class Meta:
        model = Pago
        fields = ['id','url','monto','estado','fecha_creacion','fecha_vencimiento','fecha_pago','matricula']

class CarreraCuposSerializer(serializers.ModelSerializer):
    carrera = serializers.CharField(source='nombre')
    semestre = serializers.SerializerMethodField()
    cupos = serializers.SerializerMethodField()

    class Meta:
        model = Carrera
        fields = ['id', 'carrera', 'semestre', 'cupos']

    def get_semestre(self, obj):
        return obj.seccion_set.first().ciclo.semestre.nombre if obj.seccion_set.exists() else None

    def get_cupos(self, obj):
        return obj.seccion_set.aggregate(total_cupos=models.Sum('cupos')).get('total_cupos', 0)

class CicloCuposSerializer(serializers.ModelSerializer):
    ciclo = serializers.CharField(source='nombre')
    semestre = serializers.SerializerMethodField()
    cupos = serializers.SerializerMethodField()

    class Meta:
        model = Ciclo
        fields = ['id', 'ciclo', 'semestre', 'cupos']

    def get_semestre(self, obj):
        return obj.semestre.nombre

    def get_cupos(self, obj):
        secciones = obj.seccion_set.all()
        cupos_por_seccion = [seccion.cupos for seccion in secciones]
        cupos_totales = sum(cupos_por_seccion)
        return cupos_totales