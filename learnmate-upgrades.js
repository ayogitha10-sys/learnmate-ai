/* Load last so the functional LearnMate product layer wins over legacy auth bridges. */
(function(){
  const exports={
    go,render,logoutLearnMate,createTask,closeTaskModal,saveTaskFromModal,toggleTask,deleteTask,
    generateLearningPath,completeLearningModule,askLearnMateDocument,removeLearnMateDocument,clearDocumentContext,
    startInterview,submitInterviewAnswer,createProjectFromTemplate,generateProject,toggleProjectTask,submitProject,
    improveRoadmap,sendChat,quickChat,newChat
  };
  Object.assign(window,exports);
  /* Supabase's legacy bridge installs sendChat/createTask/generateProject asynchronously. Re-apply ours after it finishes. */
  setTimeout(()=>Object.assign(window,exports),50);
  setTimeout(()=>Object.assign(window,exports),250);
})();
