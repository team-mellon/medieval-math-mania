if [ "$#" == "0" ]
 then
  sudo docker build -t hit_target:v1 .
  sudo docker run -d -p 80:80 hit_target:v1

else
    sudo docker stop $1
