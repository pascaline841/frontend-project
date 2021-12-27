<h1 align="center">JUST STREAM IT -  OpenClassRooms Project 06 </h1>
<br>

## OVERVIEW
Beta version of a web application allowing to view in real time a classification of films(IMBs) with a REST API application
<br>
<br>
This locally-executable API can be installed and executed from http://localhost:8000/api/v1/titles/ using the following steps.
## INSTALLATION
Start by closing the repository :
```
git clone https://github.com/pascaline841/frontend-project
```
Start by cloning The OCMovies-API project
```
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
```
Start access the project folder

## for Window
Create a virtual environment
```
python -m venv env
```
Enable the virtual environment
```
cd env/scripts
source activate
```

## for Linux or macOS
Create a virtual environment 
```
python3 -m venv env
```
Activate the virtual environment with 
```
source env/bin/activate 
```
## . . . 
Install the python dependencies to the virtual environment
```
pip install -r requirements.txt
```
Create and populate the project database with  
```
python manage.py create_db
```

## LAUNCH 
Run the server
```
python manage.py runserver 
```
Launch index.html

## SCREENSHOT

![juststreamit](https://user-images.githubusercontent.com/55999192/112386560-5993f900-8cae-11eb-9638-dee7df5f1b2f.PNG)
<br>
Website FullSize

![modale](https://user-images.githubusercontent.com/55999192/112386742-919b3c00-8cae-11eb-9436-177807a5e4eb.PNG)
<br>
Modal Window

![responsive](https://user-images.githubusercontent.com/55999192/112386762-995ae080-8cae-11eb-9746-1d89ae6a4772.PNG)
<br>
Responsive design
