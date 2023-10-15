const ServerUrl = "http://127.0.0.1:5000/";
const UflUrl = `${ServerUrl}uflproxy/`;
const UFL_API_KEY = localStorage.getItem("canvas_api_key") || "noApiKey";
const OPENAI_API_KEY = localStorage.getItem("openai_api_key") || "noApiKey";
const PINECONE_API_KEY = localStorage.getItem("pinecone_api_key") || "noApiKey";

async function queryAgent() {
  try {
    const response = await fetch(`${ServerUrl}query_agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "this is a test. please respond.",
      }),
    });
    const data = await response.json();

    console.log("agent query:");
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
}

async function initializePinecone() {
  try {
    const response = await fetch(`${ServerUrl}init_pinecone`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pinecone_api_key: PINECONE_API_KEY,
      })
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
}

async function fetchCourses() {
  try {
    const response = await fetch(`${UflUrl}api/v1/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${UFL_API_KEY}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {any} courseId
 */
async function fetchAssignments(courseId) {
  const validAssignments = [];
  try {
    const response = await fetch(
      `${UflUrl}api/v1/courses/${courseId}/assignments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UFL_API_KEY}`,
        },
      },
    );
    const assignments = await response.json();
    for (const assignment of assignments) {
      if (assignment.submission_types.includes("online_quiz")) {
        assignment.html_url = `${UflUrl}courses/${courseId}/assignments/${assignment.id}/history?headless=1`;
        validAssignments.push(assignment);
      }
    }
  } catch (error) {}
  return validAssignments;
}

/**
 * @param {any} courseId
 */
async function fetchCourseTasks(courseId) {
  try {
    const assignments = await fetchAssignments(courseId);
    const quizzes = await fetchQuizzes(courseId);
    const tasks = [...assignments, ...quizzes];

    tasks.sort(function (a, b) {
      return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
    });

    return tasks;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {any} courseId
 */
async function fetchQuizzes(courseId) {
  const validQuizzes = [];
  try {
    const response = await fetch(
      `${UflUrl}api/v1/courses/${courseId}/quizzes`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UFL_API_KEY}`,
        },
      },
    );
    const quizzes = await response.json();

    for (const quiz of quizzes) {
      if (quiz.hide_results != "always") {
        quiz.html_url = `${UflUrl}courses/${courseId}/quizzes/${quiz.id}/history?headless=1`;
        validQuizzes.push(quiz);
      }
    }
  } catch (error) {}
  return validQuizzes;
}

/**
 * @param {any} courseId
 */
async function fetchCourseFiles(courseId) {
  const files = [];
  try {
    const response = await fetch(
      `${UflUrl}api/v1/courses/${courseId}/folders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UFL_API_KEY}`,
        },
      },
    );
    const newFolders = await response.json();
    for (const folder of newFolders) {
      const newFiles = await fetchFilesByFolder(folder.id);
      for (const file of newFiles) {
        const ext = file.filename.substring(file.filename.length - 4);
        if (ext == ".pdf" || ext == "pptx") files.push(file);
      }
    }
  } catch (error) {}
  return files;
}

/**
 * @param {any} folderId
 */
async function fetchFilesByFolder(folderId) {
  try {
    const response = await fetch(`${UflUrl}api/v1/folders/${folderId}/files`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${UFL_API_KEY}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return []; // return empty array if no files or error occurs
  }
}

/**
 * @param {any} courseId
 */
async function fetchCourse(courseId) {
  try {
    const tasks = await fetchCourseTasks(courseId);
    const files = await fetchCourseFiles(courseId);
    return { tasks, files };
  } catch (error) {
    console.log(error);
  }
}

async function fetchAll() {
  try {
    const courses = await fetchCourses();
    const allData = [];

    for (const course of courses) {
      const courseData = await fetchCourse(course.id);
      allData.push(courseData);
    }

    return allData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchCourses,
  fetchCourseTasks,
  fetchCourseFiles,
  fetchAll,
  initializePinecone,
  queryAgent,
};
