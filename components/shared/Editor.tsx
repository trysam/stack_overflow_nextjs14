import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditor = ({ mode, field, editorRef }: any) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(_evt, editor) => {
        // @ts-ignore
        editorRef.current = editor; // This should set editor instance to editorRef
      }}
      onBlur={field.onBlur}
      onEditorChange={(content) => {
        field.onChange(content);
      }}
      initialValue=""
      init={{
        height: 350,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo |" +
          "codesample | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: `
          body { 
            font-family:Inter, font-size:16px; 
            background-color: ${mode === "dark" ? "#212734" : "white"};
            color: ${mode === "dark" ? "white" : "black"};
          }
        `,
        skin: mode === "dark" ? "oxide-dark" : "oxide",
        content_css: mode === "dark" ? "dark" : "light",
      }}
    />
  );
};

export default MyEditor;
