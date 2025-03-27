import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    doctorProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
        async ({ file }) => {
            console.log("file url", file.url);

            return { uploadedBy: "PriMed" };
        }
    ),
    doctorProfessionDocs: f({ pdf: { maxFileSize: "4MB" } }).onUploadComplete(
        async ({ file }) => {
            console.log("file url", file.url);

            return { uploadedBy: "PriMed" };
        }
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
