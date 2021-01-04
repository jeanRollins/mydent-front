import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';



export const BodyEmail = ({ handleEditorChange }) => {

    useEffect(() => {
        console.log('se ejecuto');
    }, [])


    return (
        <>
            <Editor
                apiKey='zar0sigfrxnhs29z7f7m6u2j31lq0hi2i0m3tym8m95imheg'
                initialValue=""
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
            />
        </>
    )
}
