# -*- coding: utf-8 -*-
from flask import request, session, Blueprint, json, send_from_directory

Nodos = Blueprint('Nodos', __name__)
from base import app, db, User, Evento, UPLOAD_FOLDER
import os
import datetime


@Nodos.route('/Nodos/ARegistrarUsuario', methods=['POST'])
def ARegistrarUsuario():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VInicioSesion', 'msg':[ur'Usuario registrado exitosamente']}, 
               {'label':'/VRegistroUsuario', 'msg':[ur'No se pudo registrar el usuario. Verificar los datos ingresados.']}, ]

    if not('isAdmin' in params.keys()):
        params['isAdmin'] = False
    usuario = User(params['username'],params['email'],params['password'],params['nombre'],params['apellido'],params['isAdmin'])
    try:
        db.session.add(usuario)
        db.session.commit()
        res = results[0]
    except Exception as e:
        db.session.rollback()
        res = results[1]        
    
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/VRegistroUsuario')
def VRegistroUsuario():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/AIniciarSesion', methods=['POST'])
def AIniciarSesion():
    #POST/PUT parameters
    results = [{'label':'/VEventos', 'msg':[ur'Sesión iniciada'], "actor":"usuario"}, {'label':'/VInicioSesion', 'msg':[ur'Error al iniciar sesión']},
               {'label':'/VInicioSesion', 'msg':[ur'El nombre de usuario o la contraseña que has introducido no son correctas.']}, ]

    params = request.get_json()
    try:
        usuario = User.query.filter_by(username=params['username']).first()
        if usuario.password == params['password']:
            res = results[0]
        else:
            res = results[1]
    except Exception as e:
        res = results[1]

    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/VInicioSesion')
def VInicioSesion():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/ACerrarSesion')
def ACerrarSesion():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VInicioSesion', 'msg':[ur'Sesión cerrada'], "actor":None}, ]
    res = results[0]
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/VEventos')
def VEventos():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']

    eventos = Evento.query.all()

    if len(eventos)==0:
      eve1 = Evento('Evento1', 'Descripción1', 12-12-2015, 'Lugar1', 100, 'afiche1')
      eve2 = Evento('Evento2', 'Descripción2', 12-12-2015, 'Lugar2', 200, 'afiche2')
      db.session.add(eve1)
      db.session.add(eve2)
      db.session.commit()
      eventos = Evento.query.all()

    res['data0'] = [
      {'nombre':eve.nombre, 'lugar':eve.lugar, 'fecha':eve.fecha.strftime("%d/%m/%Y")}
      for eve in eventos]
    return json.dumps(res)



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS



@Nodos.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''



@Nodos.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)



# Falta subir archivos
@Nodos.route('/Nodos/ACrearEvento', methods=['POST'])
def ACrearEvento():
    #POST/PUT parameters    
    results = [{'label':'/VEventos', 'msg':[ur'Evento creado']}, {'label':'/VCrearEvento', 'msg':[ur'Error al crear evento']},
               {'label':'/VCrearEvento', 'msg':[ur'No se pudo crear el evento. Verificar los datos ingresados.']}, ]

    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    fecha = datetime.datetime.strptime(request.form['fecha'], "%Y-%m-%d").date()
    lugar = request.form['lugar']
    capacidad = request.form['capacidad']
    afiche = request.files['afiche']
    print nombre
    print descripcion
    print fecha
    print lugar
    print capacidad
    print afiche
    # afiche.save(os.path.join(app.config['UPLOAD_FOLDER'], nombre+request.form['fecha']+".pdf"))

    evento = Evento(nombre,descripcion,fecha,lugar,capacidad,'')

    try:
        db.session.add(evento)
        db.session.commit()
        res = results[0]
    except Exception as e:
        print e
        db.session.rollback()
        res = results[1]

    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/VCrearEvento')
def VCrearEvento():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/ABorrarEvento')
def ABorrarEvento():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VEventos', 'msg':[ur'Evento borrado']}, {'label':'/VEvento', 'msg':[ur'Error al borrar evento']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/ACancelarReserva')
def ACancelarReserva():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VEvento', 'msg':[ur'Reservación cancelada exitosamente']}, {'label':'/VEvento', 'msg':[ur'Error al cancelar la reservación']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/AGenerarCertificado')
def AGenerarCertificado():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VCertificado', 'msg':[ur'Certificado generado exitosamente']}, {'label':'/VEvento', 'msg':[ur'Error al generar certificado']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/AGenerarCredenciales')
def AGenerarCredenciales():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VCredenciales', 'msg':[ur'Credenciales generados exitosamente']}, {'label':'/VEvento', 'msg':[ur'Error al generar credenciales']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/AReservarEvento')
def AReservarEvento():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VEvento', 'msg':[ur'Evento reservado exitosamente']}, {'label':'/VEvento', 'msg':[ur'Error al reservar evento']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/AVerificarAsistencia')
def AVerificarAsistencia():
    #POST/PUT parameters
    params = request.get_json()
    results = [{'label':'/VParticipantes', 'msg':[ur'Asistencia verificada exitosamente']}, {'label':'/VParticipantes', 'msg':[ur'Error al verificar asistencia']}, ]
    res = results[0]
    #Action code goes here, res should be a list with a label and a message


    #Action code ends here
    if "actor" in res:
        if res['actor'] is None:
            session.pop("actor", None)
        else:
            session['actor'] = res['actor']
    return json.dumps(res)



@Nodos.route('/Nodos/VActEvento')
def VActEvento():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VActUsuario')
def VActUsuario():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VCertificado')
def VCertificado():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VCredenciales')
def VCredenciales():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VEvento')
def VEvento():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VParticipante')
def VParticipante():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)



@Nodos.route('/Nodos/VParticipantes')
def VParticipantes():
    res = {}
    if "actor" in session:
        res['actor']=session['actor']
    #Action code goes here, res should be a JSON structure


    #Action code ends here
    return json.dumps(res)

#Use case code starts here


#Use case code ends here
