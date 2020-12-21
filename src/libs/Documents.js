
export const GetExtensionFile = ( file , type ) => {
    let extensionImage = [ "image/jpeg" , "image/png" , "image/jpg" ]
    let extensionDocuments = [ 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ,
        "application/pdf" , 
        "text/plain" ,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ] ;
    type = type.trim() ;
    const extensionDocument =  file.file[0].type ;
    if( type === 'image' ) {
        const extensionValid = extensionImage.includes( extensionDocument ) ;
        console.log('extensionValid' , extensionValid ) ;
        return extensionValid ;
    }
    
    if( type === 'document' ){
        const extensionValid = extensionDocuments.includes( extensionDocument ) ;
        console.log('extensionValid' , extensionValid ) ;
        return extensionValid ;
    } 

    return false ;
} 