// Prof Kazman's example
while(true) {
    controller.move();
if(controller.move==false)
    {
    controller.rotate();
    }
}
// my example
move_count=1;
while(move_count = 1) {
    controller.move();
if(controller.move()==false)
controller.rotate();
}