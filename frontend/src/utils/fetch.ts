import type { DocumentationCategoriesRepsponse, DocumentationFile, DocumentationIndexResponse, FolderItem, UserDataResponse } from "@/assets/customTypes";

/**
 * Validates user session.
 * @returns True if still valid, false if not.
 */
export async function fetchBase(token: string): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_API_BASE, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Fetch a JWT token if credentials are correct.
 * @returns Data or false on error.
 */
export async function fetchLogin(username: string, password: string): Promise<UserDataResponse | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        if (response.ok) {
            return await response.json();
        } else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Fetch a specific Documentation page.
 * @param folder The name of the folder with underscores instead of spaces. Examples: Get_Started, Community
 * @param name The name of the specific HTML file to retrieve, without `.html`. Examples: Introduction, Collaborating
 * @param version The version number of the index. Examples: v1, v2
 * @param language The language of the documentation. Examples: en-US, nl-NL
 * @returns HTML data as string or false on error.
 */
export async function fetchDocumentationPage(folder: string, name: string, version: string, language: string): Promise<string | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOCS_API_BASE}/getFile/${version}/${language}?folder=${folder}&name=${name}`, {
            method: "GET"
        });
        if (response.ok) {
            return (await response.json() as DocumentationFile).file;
        } else if (response.status === 404) {
            return false;
        } else return false;
    } catch (error) {
        console.log(error);
        return false
    }
}

/**
 * Fetch all pages for a specific category.
 * @param folder The name of the folder with underscores instead of spaces. Examples: Get_Started, Community
 * @param version The version number of the index. Examples: v1, v2
 * @param language The language of the documentation. Examples: en-US, nl-NL
 * @returns List of pages for the category or status code on error.
 */
export async function fetchDocumentationPages(folder: string, version: string, language: string): Promise<string | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOCS_API_BASE}/getFiles/${version}/${language}?folder=${folder}`, {
            method: "GET"
        });
        if (response.ok) {
            return (await response.json() as DocumentationFile).file;
        } else if (response.status === 404) {
            return false;
        } else return false;
    } catch (error) {
        console.log(error);
        return false
    }
}

/**
 * Fetch the landing page for a specific category.
 * @param folder The name of the folder with underscores instead of spaces. Examples: Get_Started, Community
 * @param version The version number of the index. Examples: v1, v2
 * @param language The language of the documentation. Examples: en-US, nl-NL
 * @returns HTML data as string or false on error.
 */
export async function fetchDocumentationDefault(folder: string, version: string, language: string): Promise<string | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOCS_API_BASE}/getDefault/${version}/${language}?folder=${folder}`, {
            method: "GET"
        });
        if (response.ok) {
            return (await response.json() as DocumentationFile).file;
        } else if (response.status === 404) {
            return false;
        } else return false;
    } catch (error) {
        console.log(error);
        return false
    }
}

/**
 * Fetch the index/table of contents.
 * @param version The version number of the index. Examples: v1, v2
 * @param language The language of the documentation. Examples: en-US, nl-NL
 * @returns Data or false on error.
 */
export async function fetchDocumentationIndex(version: string, language: string): Promise<DocumentationIndexResponse | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOCS_API_BASE}/getIndex/${version}/${language}`, {
            method: "GET"
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return { "index": [] };
        } else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Fetch the icons and names of the categories.
 * @param version The version number of the index. Examples: v1, v2
 * @param language The language of the documentation. Examples: en-US, nl-NL
 * @returns Data or status code on error.
 */
export async function fetchDocumentationCategories(version: string, language: string): Promise<DocumentationCategoriesRepsponse | boolean> {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOCS_API_BASE}/getCategories/${version}/${language}`, {
            method: "GET"
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return { "categories": [] };
        } else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}