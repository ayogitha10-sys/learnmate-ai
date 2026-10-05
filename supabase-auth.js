// =========================================================

// LEARNMATE AI - SUPABASE AUTHENTICATION

// =========================================================



// Your LearnMate Supabase project URL

const SUPABASE_URL = "https\://gkjjpehdrbbyuvwasdjp.supabase.co";



// Paste your Supabase PUBLISHABLE KEY between the quotes below.

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kmBPQHZmBhdwdHBkzKIO8g_ecXIIZEO";



// Create the Supabase client

const learnmateSupabase = window.supabase.createClient(

  SUPABASE_URL,

  SUPABASE_PUBLISHABLE_KEY

);





// =========================================================

// AUTH MODAL

// =========================================================



function showLearnMateAuth() {



  if (document.getElementById("learnmateAuth")) {

    document.getElementById("learnmateAuth").style.display = "flex";

    return;

  }



  const modal = document.createElement("div");



  modal.id = "learnmateAuth";



  modal.innerHTML = `

    <div style="

      position:fixed;

      inset:0;

      z-index:99999;

      background:rgba(5,12,18,.72);

      backdrop-filter:blur(12px);

      display:flex;

      align-items:center;

      justify-content:center;

      padding:20px;

    ">



      <div style="

        width:min(430px,100%);

        background:#ffffff;

        border-radius:24px;

        padding:30px;

        box-shadow:0 30px 80px rgba(0,0,0,.30);

      ">



        <div style="text-align:center;margin-bottom:24px">



          <div style="

            width:52px;

            height:52px;

            margin:0 auto 14px;

            border-radius:16px;

            display:flex;

            align-items:center;

            justify-content:center;

            background:#083335;

            color:#ffffff;

            font-size:25px;

          ">✦</div>



          <h2 style="

            margin:0;

            font-family:Manrope,sans-serif;

            font-size:25px;

            color:#102326;

          ">Welcome to LearnMate</h2>



          <p style="

            margin:8px 0 0;

            color:#647477;

            font-size:14px;

          ">

            Learn anything. Build everything. Grow with AI.

          </p>



        </div>



        <div style="

          display:flex;

          gap:8px;

          margin-bottom:18px;

          background:#f2f5f5;

          padding:5px;

          border-radius:12px;

        ">



          <button

            id="lmLoginTab"

            onclick="showLoginMode()"

            style="

              flex:1;

              border:0;

              border-radius:9px;

              padding:10px;

              cursor:pointer;

              font-weight:700;

              background:#083335;

              color:white;

            "

          >

            Log in

          </button>



          <button

            id="lmSignupTab"

            onclick="showSignupMode()"

            style="

              flex:1;

              border:0;

              border-radius:9px;

              padding:10px;

              cursor:pointer;

              font-weight:700;

              background:transparent;

              color:#536568;

            "

          >

            Sign up

          </button>



        </div>



        <div id="lmNameGroup" style="display:none;margin-bottom:12px">

          <label style="

            display:block;

            margin-bottom:6px;

            font-size:13px;

            font-weight:700;

            color:#304447;

          ">Full name</label>



          <input

            id="lmName"

            type="text"

            placeholder="Your name"

            style="

              width:100%;

              box-sizing:border-box;

              padding:13px 14px;

              border:1px solid #dce4e4;

              border-radius:11px;

              font-size:14px;

              outline:none;

            "

          >

        </div>



        <div style="margin-bottom:12px">



          <label style="

            display:block;

            margin-bottom:6px;

            font-size:13px;

            font-weight:700;

            color:#304447;

          ">Email</label>



          <input

            id="lmEmail"

            type="email"

            placeholder="you@example.com"

            style="

              width:100%;

              box-sizing:border-box;

              padding:13px 14px;

              border:1px solid #dce4e4;

              border-radius:11px;

              font-size:14px;

              outline:none;

            "

          >



        </div>



        <div style="margin-bottom:15px">



          <label style="

            display:block;

            margin-bottom:6px;

            font-size:13px;

            font-weight:700;

            color:#304447;

          ">Password</label>



          <input

            id="lmPassword"

            type="password"

            placeholder="Minimum 6 characters"

            style="

              width:100%;

              box-sizing:border-box;

              padding:13px 14px;

              border:1px solid #dce4e4;

              border-radius:11px;

              font-size:14px;

              outline:none;

            "

          >



        </div>



        <div

          id="lmAuthMessage"

          style="

            display:none;

            margin-bottom:14px;

            padding:10px 12px;

            border-radius:10px;

            font-size:13px;

            background:#fff4f4;

            color:#b42318;

          "

        ></div>



        <button

          id="lmAuthButton"

          onclick="handleLearnMateAuth()"

          style="

            width:100%;

            border:0;

            border-radius:12px;

            padding:14px;

            cursor:pointer;

            background:#083335;

            color:white;

            font-size:15px;

            font-weight:700;

          "

        >

          Log in

        </button>



        <button

          onclick="continueAsGuest()"

          style="

            width:100%;

            border:0;

            background:transparent;

            padding:13px;

            cursor:pointer;

            color:#647477;

            font-size:13px;

          "

        >

          Continue as guest

        </button>



        <button

          onclick="closeLearnMateAuth()"

          style="

            width:100%;

            border:0;

            background:transparent;

            padding:4px;

            cursor:pointer;

            color:#9aa6a8;

            font-size:12px;

          "

        >

          Close

        </button>



      </div>

    </div>

  `;



  document.body.appendChild(modal);

}





// =========================================================

// AUTH MODE

// =========================================================



let learnMateAuthMode = "login";





function showLoginMode() {



  learnMateAuthMode = "login";



  document.getElementById("lmNameGroup").style.display = "none";



  document.getElementById("lmAuthButton").textContent = "Log in";



  document.getElementById("lmLoginTab").style.background = "#083335";

  document.getElementById("lmLoginTab").style.color = "white";



  document.getElementById("lmSignupTab").style.background = "transparent";

  document.getElementById("lmSignupTab").style.color = "#536568";



  clearAuthMessage();

}





function showSignupMode() {



  learnMateAuthMode = "signup";



  document.getElementById("lmNameGroup").style.display = "block";



  document.getElementById("lmAuthButton").textContent = "Create account";



  document.getElementById("lmSignupTab").style.background = "#083335";

  document.getElementById("lmSignupTab").style.color = "white";



  document.getElementById("lmLoginTab").style.background = "transparent";

  document.getElementById("lmLoginTab").style.color = "#536568";



  clearAuthMessage();

}





// =========================================================

// LOGIN / SIGNUP

// =========================================================



async function handleLearnMateAuth() {



  const email = document.getElementById("lmEmail").value.trim();

  const password = document.getElementById("lmPassword").value;



  if (!email || !password) {

    showAuthMessage("Please enter your email and password.");

    return;

  }



  if (password.length < 6) {

    showAuthMessage("Password must contain at least 6 characters.");

    return;

  }



  const button = document.getElementById("lmAuthButton");



  button.disabled = true;

  button.textContent = learnMateAuthMode === "login"

    ? "Logging in..."

    : "Creating account...";



  clearAuthMessage();



  try {



    let result;



    if (learnMateAuthMode === "signup") {



      const name =

        document.getElementById("lmName").value.trim() || "Learner";



      result = await learnmateSupabase.auth.signUp({

        email,

        password,

        options: {

          data: {

            full_name: name

          }

        }

      });



    } else {



      result = await learnmateSupabase.auth.signInWithPassword({

        email,

        password

      });



    }



    if (result.error) {

      throw result.error;

    }



    const user = result.data.user;



    if (!user) {

      throw new Error("Account was created, but no user session was returned.");

    }



    // For signup, create the LearnMate profile.

    if (learnMateAuthMode === "signup") {



      const name =

        document.getElementById("lmName").value.trim() || "Learner";



      const { error: profileError } =

        await learnmateSupabase

          .from("profiles")

          .insert({

            user_id: user.id,

            full_name: name,

            education: "",

            career_goal: "Learner",

            interests: ""

          });



      if (profileError && profileError.code !== "23505") {

        throw profileError;

      }



      state.user = {

        name: name,

        goal: "Learner"

      };



    } else {



      await loadLearnMateProfile(user.id);



    }



    store.set("lm_user", state.user);



    closeLearnMateAuth();



    // Route through the onboarding/profile check.
    await checkLearnMateOnboarding();



    toast(

      learnMateAuthMode === "signup"

        ? "Welcome to LearnMate!"

        : "Welcome back!"

    );



  } catch (error) {



    console.error("LearnMate authentication error:", error);



    showAuthMessage(

      error.message || "Authentication failed. Please try again."

    );



  } finally {



    button.disabled = false;



    button.textContent =

      learnMateAuthMode === "login"

        ? "Log in"

        : "Create account";

  }

}





// =========================================================

// LOAD PROFILE

// =========================================================



async function loadLearnMateProfile(userId) {



  const { data, error } =

    await learnmateSupabase

      .from("profiles")

      .select("full_name, career_goal, education, interests")

      .eq("user_id", userId)

      .maybeSingle();



  if (error) {

    console.error("Profile loading error:", error);

    return;

  }



  if (data) {

    const packedInterests = String(data.interests || '');
    const savedOnboarding = store.get('lm_onboarding', {});

    const extractMemoryField = (label) => {
      const match = packedInterests
        .split(' | ')
        .find(part => part.startsWith(label));
      return match ? match.slice(label.length).trim() : '';
    };

    state.user = {
      ...state.user,
      name: data.full_name || "Learner",
      goal: data.career_goal || "Learner",
      education: data.education || savedOnboarding.education || '',
      interests: savedOnboarding.interests || packedInterests,
      level: savedOnboarding.level || extractMemoryField('Level:'),
      dailyHours: savedOnboarding.hours || extractMemoryField('Study time:'),
      learningStyle: savedOnboarding.style || extractMemoryField('Learning style:'),
      deadline: savedOnboarding.deadline || extractMemoryField('Deadline:'),
      firstGoal: savedOnboarding.firstGoal || extractMemoryField('First goal:')
    };



  }

}





// =========================================================

// GUEST MODE

// =========================================================



function continueAsGuest() {



  closeLearnMateAuth();



  window._learnMateGuest = true;



  go("dashboard");

}





// =========================================================

// CLOSE AUTH

// =========================================================



function closeLearnMateAuth() {



  const modal = document.getElementById("learnmateAuth");



  if (modal) {

    modal.style.display = "none";

  }

}





function showAuthMessage(message) {



  const el = document.getElementById("lmAuthMessage");



  if (!el) return;



  el.textContent = message;

  el.style.display = "block";

}





function clearAuthMessage() {



  const el = document.getElementById("lmAuthMessage");



  if (!el) return;



  el.textContent = "";

  el.style.display = "none";

}





// =========================================================

// CONNECT EXISTING "TRY LEARNMATE" BUTTONS

// =========================================================



// Save the original behavior.

const originalLearnMateEnterApp = window.enterApp;



// Replace it with authenticated entry.

window.enterApp = async function () {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (session && session.user) {



    await loadLearnMateProfile(session.user.id);



    store.set("lm_user", state.user);



    // Complete profiles go to Dashboard; incomplete profiles go to onboarding.
    await checkLearnMateOnboarding();



  } else {



    showLearnMateAuth();



  }

};





// =========================================================

// AUTH STATE LISTENER

// =========================================================



learnmateSupabase.auth.onAuthStateChange(async (event, session) => {



  if (event === "SIGNED_IN" && session?.user) {



    await loadLearnMateProfile(session.user.id);



    store.set("lm_user", state.user);
    await checkLearnMateOnboarding();

  }



});





// Make useful functions available to the existing HTML.

window.showLearnMateAuth = showLearnMateAuth;

window.showLoginMode = showLoginMode;

window.showSignupMode = showSignupMode;

window.handleLearnMateAuth = handleLearnMateAuth;

window.continueAsGuest = continueAsGuest;

window.closeLearnMateAuth = closeLearnMateAuth;

// =========================================================

// SAVE PROFILE TO SUPABASE

// =========================================================



window.saveSettings = async function () {



  const name =

    document.getElementById("sname").value.trim() || "Learner";



  const goal =

    document.getElementById("sgoal").value.trim() || "Learner";



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  // Guest users don't have a cloud profile.

  if (!session?.user) {

    state.user.name = name;

    state.user.goal = goal;



    store.set("lm_user", state.user);



    toast("Profile updated locally");

    render();



    return;

  }



  const { error } =

    await learnmateSupabase

      .from("profiles")

      .update({

        full_name: name,

        career_goal: goal

      })

      .eq("user_id", session.user.id);



  if (error) {



    console.error("Profile update error:", error);



    toast("Could not save profile");



    return;

  }



  // Keep the UI state synchronized with the database.

  state.user.name = name;

  state.user.goal = goal;



  store.set("lm_user", state.user);



  toast("Profile saved to LearnMate");



  render();

};

// =========================================================

// SAVE PLANNER TASK TO SUPABASE

// =========================================================



// =========================================================

// LEARNMATE TASK CREATOR

// Custom popup for VS Code Integrated Browser

// =========================================================



window.createTask = function () {



  // Don't create the popup twice.

  if (document.getElementById("learnmateTaskModal")) {

    document.getElementById("learnmateTaskModal").style.display = "flex";

    document.getElementById("lmTaskTitle").focus();

    return;

  }



  const modal = document.createElement("div");



  modal.id = "learnmateTaskModal";



  modal.innerHTML = `

    <div style="

      position:fixed;

      inset:0;

      z-index:99999;

      background:rgba(5,12,18,.72);

      backdrop-filter:blur(12px);

      display:flex;

      align-items:center;

      justify-content:center;

      padding:20px;

    ">



      <div style="

        width:min(460px,100%);

        background:#ffffff;

        border-radius:24px;

        padding:30px;

        box-shadow:0 30px 80px rgba(0,0,0,.35);

      ">



        <div style="

          width:48px;

          height:48px;

          border-radius:15px;

          background:#083335;

          color:#ffffff;

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:22px;

          margin-bottom:18px;

        ">✦</div>



        <h2 style="

          margin:0;

          font-family:Manrope,sans-serif;

          color:#102326;

          font-size:24px;

        ">

          Add a goal

        </h2>



        <p style="

          margin:8px 0 20px;

          color:#647477;

          font-size:14px;

        ">

          What would you like LearnMate to add to your plan?

        </p>



        <label style="

          display:block;

          margin-bottom:7px;

          font-size:13px;

          font-weight:700;

          color:#304447;

        ">

          Goal or task

        </label>



        <input

          id="lmTaskTitle"

          type="text"

          placeholder="e.g. Learn Python for 30 minutes"

          style="

            width:100%;

            box-sizing:border-box;

            padding:14px;

            border:1px solid #dce4e4;

            border-radius:12px;

            font-size:14px;

            outline:none;

          "

        >



        <div style="

          display:flex;

          gap:10px;

          margin-top:18px;

        ">



          <button

            onclick="closeTaskModal()"

            style="

              flex:1;

              border:1px solid #dce4e4;

              background:#ffffff;

              color:#536568;

              border-radius:12px;

              padding:13px;

              cursor:pointer;

              font-weight:700;

            "

          >

            Cancel

          </button>



          <button

            onclick="saveLearnMateTask()"

            style="

              flex:1;

              border:0;

              background:#083335;

              color:#ffffff;

              border-radius:12px;

              padding:13px;

              cursor:pointer;

              font-weight:700;

            "

          >

            Add goal

          </button>



        </div>



      </div>

    </div>

  `;



  document.body.appendChild(modal);



  setTimeout(() => {

    document.getElementById("lmTaskTitle").focus();

  }, 50);

};





// =========================================================

// CLOSE TASK POPUP

// =========================================================



window.closeTaskModal = function () {



  const modal = document.getElementById("learnmateTaskModal");



  if (modal) {

    modal.style.display = "none";

  }



};





// =========================================================

// SAVE TASK TO SUPABASE

// =========================================================



window.saveLearnMateTask = async function () {



  const input = document.getElementById("lmTaskTitle");



  if (!input) return;



  const title = input.value.trim();



  if (!title) {



    input.style.borderColor = "#d92d20";



    input.focus();



    return;

  }



  const button =

    document.querySelector("#learnmateTaskModal button:last-child");



  if (button) {

    button.disabled = true;

    button.textContent = "Saving...";

  }



  try {



    const {

      data: { session }

    } = await learnmateSupabase.auth.getSession();





    // =====================================================

    // GUEST MODE

    // =====================================================



    if (!session?.user) {



      state.tasks.push(title);



      store.set("lm_tasks", state.tasks);



      closeTaskModal();



      toast("Goal added to your plan");



      return;

    }





    // =====================================================

    // LOGGED-IN USER

    // =====================================================



    const { data, error } =

      await learnmateSupabase

        .from("tasks")

        .insert({

          user_id: session.user.id,

          title: title,

          description: "",

          priority: "medium",

          status: "pending",

          completed: false

        })

        .select()

        .single();





    if (error) {



      console.error("Task creation error:", error);



      toast("Could not save task");



      return;

    }





    // Keep local UI synchronized.

    state.tasks.push(data.title);



    store.set("lm_tasks", state.tasks);



    closeTaskModal();



    toast("Task saved to LearnMate");



  } catch (error) {



    console.error("Task error:", error);



    toast("Something went wrong while saving");



  } finally {



    if (button) {



      button.disabled = false;

      button.textContent = "Add goal";



    }



  }



};

// =========================================================

// LOAD SAVED TASKS INTO PLANNER

// =========================================================



async function loadLearnMatePlannerTasks() {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    return;

  }



  const { data, error } =

    await learnmateSupabase

      .from("tasks")

      .select("id, title, description, due_date, priority, status, completed, created_at")

      .eq("user_id", session.user.id)

      .order("created_at", { ascending: false });



  if (error) {

    console.error("Planner task loading error:", error);

    return;

  }



  const content = document.querySelector(".content");



  if (!content) {

    return;

  }



  // Remove an older saved-task section before adding the latest one.

  const oldSection =

    document.getElementById("learnmateSavedTasks");



  if (oldSection) {

    oldSection.remove();

  }



  if (!data || data.length === 0) {

    return;

  }



  const section = document.createElement("div");



  section.id = "learnmateSavedTasks";



  section.innerHTML = `

    <div class="section-head" style="margin-top:28px">

      <h2>Your saved goals</h2>

      <span class="muted">${data.length} task${data.length === 1 ? "" : "s"}</span>

    </div>



    <div class="card">



      ${data.map(task => `

        <div

          style="

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:16px;

            padding:16px 0;

            border-bottom:1px solid rgba(255,255,255,.08);

          "

        >



          <div style="display:flex;align-items:center;gap:14px">



            <div

              style="

                width:10px;

                height:10px;

                border-radius:50%;

                background:${task.completed ? "#7ee8c8" : "#66d9ef"};

              "

            ></div>



            <div>

              <strong>${esc(task.title)}</strong>



              <div

                class="muted"

                style="margin-top:5px"

              >

                ${task.status || "pending"}

                · ${task.priority || "medium"} priority

              </div>

            </div>



          </div>



          <span class="tag">

            ${task.completed ? "Completed" : "Pending"}

          </span>



        </div>

      `).join("")}



    </div>

  `;



  content.appendChild(section);

}





// =========================================================

// LOAD TASKS WHEN PLANNER OPENS

// =========================================================



const originalLearnMateGo = window.go;



window.go = async function(page) {



  originalLearnMateGo(page);



  if (page === "planner") {



    // Give the page a moment to render.

    setTimeout(() => {

      loadLearnMatePlannerTasks();

    }, 50);



  }



};





// Make task loader available if needed later.

window.loadLearnMatePlannerTasks = loadLearnMatePlannerTasks;

// =========================================================

// COMPLETE / UNCOMPLETE PLANNER TASKS

// =========================================================



window.completeLearnMateTask = async function (taskId, completed) {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    toast("Log in to save task progress");

    return;

  }



  const { error } =

    await learnmateSupabase

      .from("tasks")

      .update({

        completed: completed,

        status: completed ? "completed" : "pending"

      })

      .eq("id", taskId)

      .eq("user_id", session.user.id);



  if (error) {

    console.error("Task completion error:", error);

    toast("Could not update task");

    return;

  }



  toast(

    completed

      ? "Goal completed! 🎉"

      : "Goal moved back to pending"

  );



  // Reload the Planner so the UI reflects the database.

  if (state.page === "planner") {

    setTimeout(() => {

      loadLearnMatePlannerTasks();

      setTimeout(() => addTaskCompletionControls(), 150);

    }, 50);

  }

};





// =========================================================

// ADD CHECKBOXES TO SAVED GOALS

// =========================================================



async function addTaskCompletionControls() {



  const section =

    document.getElementById("learnmateSavedTasks");



  if (!section) return;



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) return;



  const { data, error } =

    await learnmateSupabase

      .from("tasks")

      .select("id, completed")

      .eq("user_id", session.user.id)

      .order("created_at", { ascending: false });



  if (error || !data) return;



  const rows =

    section.querySelectorAll(".card > div");



  data.forEach((task, index) => {



    const row = rows[index];



    if (!row) return;



    // Don't add the control twice.

    if (row.querySelector(".lm-task-check")) return;



    const button = document.createElement("button");



    button.className = "lm-task-check";



    button.type = "button";



    button.textContent =

      task.completed ? "✓ Done" : "Mark done";



    button.style.cssText = `

      border:0;

      border-radius:10px;

      padding:9px 12px;

      cursor:pointer;

      font-size:12px;

      font-weight:700;

      background:${task.completed ? "#dff8ef" : "#083335"};

      color:${task.completed ? "#17664f" : "#ffffff"};

      white-space:nowrap;

    `;



    button.onclick = () => {



      button.disabled = true;



      completeLearnMateTask(

        task.id,

        !task.completed

      );



    };



    row.appendChild(button);



  });

}





// =========================================================

// LOAD COMPLETION CONTROLS WHEN PLANNER OPENS

// =========================================================



const learnMateOriginalGoForCompletion =

  window.go;



window.go = function(page) {



  learnMateOriginalGoForCompletion(page);



  if (page === "planner") {



    setTimeout(() => {



      addTaskCompletionControls();



    }, 250);



  }



};

// =========================================================

// AI ASSISTANT - SUPABASE CONVERSATION STORAGE

// =========================================================



let learnMateConversationId = null;





// ---------------------------------------------------------

// GET OR CREATE A CONVERSATION

// ---------------------------------------------------------



async function getLearnMateConversation() {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    return null;

  }



  // Reuse the conversation already opened in this session.

  if (learnMateConversationId) {

    return learnMateConversationId;

  }



  // Try to load the user's latest conversation.

  const { data: existing, error: existingError } =

    await learnmateSupabase

      .from("conversations")

      .select("id")

      .eq("user_id", session.user.id)

      .order("created_at", { ascending: false })

      .limit(1)

      .maybeSingle();



  if (existingError) {

    console.error("Conversation lookup error:", existingError);

  }



  if (existing?.id) {

    learnMateConversationId = existing.id;

    return existing.id;

  }



  // No conversation exists — create one.

  const { data, error } =

    await learnmateSupabase

      .from("conversations")

      .insert({

        user_id: session.user.id,

        title: "My LearnMate conversation"

      })

      .select("id")

      .single();



  if (error) {

    console.error("Conversation creation error:", error);

    return null;

  }



  learnMateConversationId = data.id;



  return data.id;

}





// ---------------------------------------------------------

// SAVE ONE MESSAGE

// ---------------------------------------------------------



async function saveLearnMateMessage(role, content) {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    return;

  }



  const conversationId =

    await getLearnMateConversation();



  if (!conversationId) {

    return;

  }



  const { error } =

    await learnmateSupabase

      .from("messages")

      .insert({

        user_id: session.user.id,

        conversation_id: conversationId,

        role: role,

        content: content

      });



  if (error) {

    console.error("Message save error:", error);

  }

}





// ---------------------------------------------------------

// LOAD LATEST CONVERSATION

// ---------------------------------------------------------



async function loadLearnMateConversation() {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    return;

  }



  const { data: conversation, error: conversationError } =

    await learnmateSupabase

      .from("conversations")

      .select("id")

      .eq("user_id", session.user.id)

      .order("created_at", { ascending: false })

      .limit(1)

      .maybeSingle();



  if (conversationError || !conversation) {

    return;

  }



  learnMateConversationId = conversation.id;



  const { data: messages, error } =

    await learnmateSupabase

      .from("messages")

      .select("role, content, created_at")

      .eq("user_id", session.user.id)

      .eq("conversation_id", conversation.id)

      .order("created_at", { ascending: true });



  if (error) {

    console.error("Conversation loading error:", error);

    return;

  }



  if (!messages || messages.length === 0) {

    return;

  }



  state.chats = messages.map(message => ({

    who: message.role === "assistant"

      ? "ai"

      : message.role === "user"

        ? "user"

        : "ai",

    text: message.content

  }));



  store.set("lm_chats", state.chats);



  render();



  setTimeout(() => {



    const el =

      document.getElementById("chatMessages");



    if (el) {

      el.scrollTop = el.scrollHeight;

    }



  }, 50);

}





// ---------------------------------------------------------
// REAL AI CHAT - SECURE VERCEL BACKEND
// ---------------------------------------------------------

window.sendChat = async function(e) {
  e.preventDefault();

  const input = document.getElementById("chatInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  input.value = "";

  state.chats.push({
    who: "user",
    text: text
  });

  store.set("lm_chats", state.chats);
  render();

  await saveLearnMateMessage("user", text);

  state.chats.push({
    who: "ai",
    text: "Thinking through your goal..."
  });
  render();

  try {
    const history = state.chats
      .filter(message => message.text !== "Thinking through your goal...")
      .slice(-12)
      .map(message => ({
        role: message.who === "user" ? "user" : "assistant",
        content: message.text
      }));

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        history: history,
        profile: {
          name: state.user?.name || "Learner",
          career_goal: state.user?.goal || "Not specified"
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "LearnMate could not get an AI response.");
    }

    const aiText =
      data.output ||
      "I couldn't generate a response this time. Please try again.";

    state.chats = state.chats.filter(
      message => message.text !== "Thinking through your goal..."
    );

    state.chats.push({
      who: "ai",
      text: aiText
    });

    store.set("lm_chats", state.chats);
    render();

    await saveLearnMateMessage("assistant", aiText);

  } catch (error) {
    console.error("LearnMate AI error:", error);

    state.chats = state.chats.filter(
      message => message.text !== "Thinking through your goal..."
    );

    const errorMessage =
      "I couldn't reach my AI service right now. Please check that the LearnMate AI backend is configured correctly and try again.";

    state.chats.push({
      who: "ai",
      text: errorMessage
    });

    store.set("lm_chats", state.chats);
    render();

    await saveLearnMateMessage("assistant", errorMessage);
  }

  setTimeout(() => {
    const el = document.getElementById("chatMessages");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, 50);
};

// ---------------------------------------------------------

// LOAD CLOUD CHAT WHEN AI ASSISTANT OPENS

// ---------------------------------------------------------



const learnMatePreviousGoForChat =

  window.go;



window.go = function(page) {



  learnMatePreviousGoForChat(page);



  if (page === "ai") {



    setTimeout(() => {

      loadLearnMateConversation();

    }, 100);



  }



};





// Make the loader available for testing.

window.loadLearnMateConversation =

  loadLearnMateConversation;

// =========================================================

// PROJECT GENERATOR - SUPABASE

// =========================================================



function learnMateEscapeProjectText(value) {

  return String(value || "")

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}





// ---------------------------------------------------------

// GENERATE + SAVE PROJECT

// ---------------------------------------------------------



window.generateProject = async function () {



  const input =

    document.getElementById("projectInput");



  if (!input) return;



  const idea = input.value.trim();



  if (!idea) {

    toast("Tell me what you want to build first");

    input.focus();

    return;

  }



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    toast("Log in to save your project");

    return;

  }



  toast("Creating your project...");



  const project = {

    user_id: session.user.id,

    title: idea,

    description:

      `Build ${idea} as a portfolio-ready project with clear requirements, an AI/ML workflow, testing and deployment.`,

    category: "AI / ML",

    difficulty: "Intermediate",

    status: "planned",

    tech_stack: [

      "Python",

      "Machine Learning",

      "AI",

      "GitHub"

    ]

  };



  const { data, error } =

    await learnmateSupabase

      .from("projects")

      .insert(project)

      .select()

      .single();



  if (error) {



    console.error("Project save error:", error);



    toast("Could not save project");



    return;

  }



  toast("Project saved to LearnMate 🚀");



  showLearnMateSavedProjects();



};





// ---------------------------------------------------------

// SHOW SAVED PROJECTS

// ---------------------------------------------------------



async function showLearnMateSavedProjects() {



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) return;



  const { data, error } =

    await learnmateSupabase

      .from("projects")

      .select(

        "id, title, description, category, difficulty, status, tech_stack, created_at"

      )

      .eq("user_id", session.user.id)

      .order("created_at", { ascending: false });



  if (error) {



    console.error("Project loading error:", error);



    return;

  }



  const content =

    document.querySelector(".content");



  if (!content) return;



  const old =

    document.getElementById("learnmateSavedProjects");



  if (old) old.remove();



  if (!data || data.length === 0) return;



  const section =

    document.createElement("div");



  section.id =

    "learnmateSavedProjects";



  section.innerHTML = `

    <div class="section-head" style="margin-top:30px">

      <h2>My projects</h2>

      <span class="muted">

        ${data.length} saved

      </span>

    </div>



    <div class="grid g3">



      ${data.map(project => {



        const title =

          learnMateEscapeProjectText(project.title);



        const description =

          learnMateEscapeProjectText(project.description);



        const category =

          learnMateEscapeProjectText(project.category);



        const difficulty =

          learnMateEscapeProjectText(project.difficulty);



        return `

          <div class="card feature-card">



            <div>



              <span class="tag">

                ${category} · ${difficulty}

              </span>



              <h3 style="margin-top:12px">

                ${title}

              </h3>



              <p>

                ${description}

              </p>



            </div>



            <div style="margin-top:14px">



              <span class="tag">

                ${project.status || "planned"}

              </span>



            </div>



          </div>

        `;



      }).join("")}



    </div>

  `;



  content.appendChild(section);



}





// ---------------------------------------------------------

// LOAD SAVED PROJECTS WHEN PROJECT PAGE OPENS

// ---------------------------------------------------------



const learnMatePreviousGoForProjects =

  window.go;



window.go = function(page) {



  learnMatePreviousGoForProjects(page);



  if (page === "projects") {



    setTimeout(() => {

      showLearnMateSavedProjects();

    }, 100);



  }



};



window.showLearnMateSavedProjects =

  showLearnMateSavedProjects;

// =========================================================

// RESUME STUDIO - SUPABASE PERSISTENCE

// =========================================================



window.saveResume = async function () {



  const name =

    document.getElementById("rname")?.value.trim() || "Learner";



  const role =

    document.getElementById("rrole")?.value.trim() || "Learner";



  const summary =

    document.getElementById("rsummary")?.value.trim() || "";



  const {

    data: { session }

  } = await learnmateSupabase.auth.getSession();



  if (!session?.user) {

    toast("Please log in to save your resume");

    return;

  }



  const resumeData = {

    full_name: name,

    target_role: role,

    professional_summary: summary,

    skills: [

      "Python",

      "Machine Learning",

      "NLP",

      "LLMs",

      "RAG",

      "SQL",

      "Git"

    ],

    projects: [

      "LearnMate AI"

    ],

    education:

      "B.Tech — Computer Science & Engineering",

    location:

      "Hyderabad, India"

  };



  // Simple demo ATS score.

  // Later we can replace this with a real AI ATS analyzer.

  let atsScore = 78;



  if (summary.length >= 100) {

    atsScore += 5;

  }



  if (role.toLowerCase().includes("ai") ||

      role.toLowerCase().includes("machine") ||

      role.toLowerCase().includes("ml")) {

    atsScore += 5;

  }



  atsScore = Math.min(atsScore, 95);



  const { error } =

    await learnmateSupabase

      .from("resumes")

      .insert({

        user_id: session.user.id,

        title: `${name} - ${role}`,

        resume_data: resumeData,

        ats_score: atsScore

      });



  if (error) {



    console.error("Resume save error:", error);



    toast("Could not save resume");



    return;

  }



  // Update the existing preview.

  const previewName =

    document.getElementById("previewName");



  const previewSummary =

    document.getElementById("previewSummary");



  if (previewName) {

    previewName.textContent = name;

  }



  if (previewSummary) {

    previewSummary.textContent = summary;

  }



  // Keep the local profile synchronized too.

  state.user.name = name;

  state.user.goal = role;



  store.set("lm_user", state.user);



  toast(`Resume saved • ATS score ${atsScore}%`);

};