import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../hooks/AppContext";
import { ContextDocument, DocumentType } from "@src/types";
import { Document, Page } from "react-pdf";
import { uploadFromUrl } from "../../api/api";

const DocumentBox = () => {
  const { contextDocument, setContextDocument } = useAppContext();
  useState<ContextDocument | null>(null);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    callFetchData();
  }, [contextDocument]);

  if (!contextDocument) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-black">
        <h1 className="text-4xl">No Document Selected</h1>
      </div>
    );
  }

  const isPdf =
    contextDocument.doc_type == "assignment" &&
    contextDocument.url.startsWith("http://localhost");

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  async function callFetchData() {
    if (
      contextDocument?.url &&
      !contextDocument.url.startsWith("http://localhost")
    ) {
      try {
        const data = await uploadFromUrl(contextDocument.url);
        console.log(data);
        setContextDocument({ ...contextDocument, url: data.pdf_url });
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    }
  }

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col justify-start items-center text-black p-2">
      <h1 className="text-4xl pt-1 pb-2">{contextDocument.name}</h1>
      <div className="flex justify-center items-center w-full h-full overflow-hidden">
        {isPdf ? (
          <div className="w-full h-full overflow-hidden relative">
            <Document
              file={contextDocument.url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="self-center w-full h-full overflow-auto"
            >
              {Array.from(new Array(numPages), (el, index) => [
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="absolute left-1/2 transform -translate-x-1/2"
                />,
                numPages > 1 && index < numPages - 1 ? (
                  <div className="h-2" key={`divider_${index + 1}`}></div>
                ) : null,
              ]).reduce((prev, curr) => prev.concat(curr), [])}
            </Document>
          </div>
        ) : (
          <p className="self-center overflow-auto">
            ContextDocumentURL: {contextDocument.url}
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentBox;
