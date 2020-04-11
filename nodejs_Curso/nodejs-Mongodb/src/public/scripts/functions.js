$(()=>{
    var operation=0;
    var url='';

    $('#btnCreate').on('click',(e)=>{   

        e.preventDefault();
        operation=1;    
        url=$(e.currentTarget).attr('href');

        $('#myModal').modal('show');
        $('#btnGuardar').html('Save');
        $('#titleModal').html('New Note!');

        $('form input,textarea').each(function(){
            this.value='';
            $(this).removeAttr('disabled');
        });     
    });

    $('.btnUpdate').on('click',(e)=>{   
        e.preventDefault();
        operation=2;
        url=$(e.currentTarget).attr('href'); 

        $('#myModal').modal('show');
        $('#btnGuardar').html('Save');
        $('#titleModal').html('Update Note!');
        
        $.get(url).done((data)=>{
            $('form input,textarea').each(function(){
                this.value=data[this.name];
                // $(e.currentTarget).val()=data[$(e.currentTarget).name];
                $(this).removeAttr('disabled');
            });            
        });
        
    });

    $('.btnDelete').on('click',(e)=>{ 
        e.preventDefault();        
        operation=3;    
        url=$(e.currentTarget).attr('href'); 
        $('#btnGuardar').html('Delete');  
        $('#myModal').modal('show');
        $('#titleModal').html('Remove Note!');


        $.get(url).done((data)=>{
            $('form input,textarea').each(function(){
                this.value=data[this.name];
                // $(e.currenTarget).val()=data[$(e.currenTarget).name];
                $(this).attr('disabled','disabled');
            });            
        });
    });

    $('#btnGuardar').on('click',()=>{
        data={};
        $('#myModal form input,textarea').each(function(){
            data[this.name]=this.value;
        });
        data.operation=operation;

        $.ajax({
            url,
            data,
            method:'post',
            dataType:'json',
            beforeSend:()=>{
                console.log('ajax empezo')
            }
        }).done((data)=>{
            if(data.error){
                $('#seccionRecargar').load('/errors',function(){
                    $('#myModal').modal('show');
                });
            }else{
                location.reload();
            }

        });
    })
})