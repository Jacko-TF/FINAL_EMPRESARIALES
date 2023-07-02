from django.contrib import admin

from .models import Estudiante, Semestre, Seccion, Ciclo, Departamento, Carrera, Curso, Matricula, Pago

class EstudianteAdmin(admin.ModelAdmin):
    list_display = ['nombre','apellido','fecha_nacimiento','direccion','dni','telefono']

class SemestreAdmin(admin.ModelAdmin):
    list_display = ['nombre','fecha_inicio','fecha_final']

class CicloAdmin(admin.ModelAdmin):
    list_display = ['nombre','semestre']

class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ['nombre']

class CarreraAdmin(admin.ModelAdmin):
    list_display = ['nombre','departamento']

class SeccionAdmin(admin.ModelAdmin):
    list_display = ['nombre','cupos','ciclo','carrera']

class CursoAdmin(admin.ModelAdmin):
    list_display = ['nombre','descripcion','credito','horas','seccion']

class MatriculaAdmin(admin.ModelAdmin):
    list_display = ['fecha','estudiante','seccion']

class PagoAdmin(admin.ModelAdmin):
    list_display = ['monto','estado','fecha_creacion','fecha_vencimiento','fecha_pago','matricula']

admin.site.register(Estudiante, EstudianteAdmin)
admin.site.register(Semestre, SemestreAdmin)
admin.site.register(Ciclo, CicloAdmin)
admin.site.register(Departamento, DepartamentoAdmin)
admin.site.register(Carrera, CarreraAdmin)
admin.site.register(Seccion, SeccionAdmin)
admin.site.register(Curso, CursoAdmin)
admin.site.register(Matricula, MatriculaAdmin)
admin.site.register(Pago, PagoAdmin)