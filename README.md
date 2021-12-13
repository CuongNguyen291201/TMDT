 Event-API

 event {
 
    name: String,
    
    shortDescription: String,
    
    description: String,
    
    image: String,
    
    publishDate: Number,
    
    exprireDate: Number,
    
    opened?: Boolean
}

 GET("/get-event") => truyền _id lấy event theo _id
 
 GET("/get-all-events") => trả về tất cả event
 
 POST("/create-event") => truyền event lên
 
 POST("/update-event") => truyền event và _id
 
 POST("/delete-event") => truyền _id 
