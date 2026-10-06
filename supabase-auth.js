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
  const existing = document.getElementById("learnmateAuth");
  if (existing) {
    existing.style.setProperty("display", "flex", "important");
    return;
  }

  const styleId = "learnmate-auth-ui-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      #learnmateAuth { position:fixed !important; inset:0 !important; z-index:2147483647 !important; display:flex !important; align-items:center !important; justify-content:center !important; width:100vw !important; height:100vh !important; min-height:100dvh !important; margin:0 !important; padding:24px !important; box-sizing:border-box !important; background:rgba(5,12,18,.78) !important; backdrop-filter:blur(12px) !important; overflow:auto !important; }
      #learnmateAuth .lm-auth-backdrop { position:absolute !important; inset:0 !important; width:100% !important; height:100% !important; }
      #learnmateAuth .lm-auth-card { position:relative !important; z-index:1 !important; width:min(460px,100%) !important; max-height:calc(100dvh - 48px) !important; overflow-y:auto !important; margin:auto !important; padding:30px !important; box-sizing:border-box !important; background:#fff !important; border:1px solid rgba(8,51,53,.10) !important; border-radius:24px !important; box-shadow:0 30px 90px rgba(0,0,0,.35) !important; color:#102326 !important; font-family:DM Sans,Arial,sans-serif !important; }
      #learnmateAuth .lm-auth-header { text-align:center !important; margin-bottom:22px !important; }
      #learnmateAuth .lm-auth-logo { width:52px !important; height:52px !important; margin:0 auto 14px !important; border-radius:16px !important; display:grid !important; place-items:center !important; background:#083335 !important; color:#fff !important; font-size:25px !important; }
      #learnmateAuth .lm-auth-title { margin:0 !important; font-family:Manrope,Arial,sans-serif !important; font-size:25px !important; line-height:1.2 !important; color:#102326 !important; }
      #learnmateAuth .lm-auth-subtitle { margin:8px 0 0 !important; color:#647477 !important; font-size:14px !important; line-height:1.5 !important; }
      #learnmateAuth .lm-auth-tabs { display:grid !important; grid-template-columns:1fr 1fr !important; gap:6px !important; margin-bottom:20px !important; padding:5px !important; background:#f2f5f5 !important; border-radius:12px !important; box-sizing:border-box !important; }
      #learnmateAuth .lm-auth-tab { display:block !important; width:100% !important; min-width:0 !important; margin:0 !important; padding:11px 12px !important; border:0 !important; border-radius:9px !important; background:transparent !important; color:#536568 !important; font:700 14px/1.2 DM Sans,Arial,sans-serif !important; text-align:center !important; cursor:pointer !important; box-sizing:border-box !important; }
      #learnmateAuth .lm-auth-tab.active { background:#083335 !important; color:#fff !important; }
      #learnmateAuth .lm-auth-field { margin-bottom:14px !important; }
      #learnmateAuth .lm-auth-label { display:block !important; margin:0 0 6px !important; color:#304447 !important; font:700 13px/1.3 DM Sans,Arial,sans-serif !important; }
      #learnmateAuth .lm-auth-input { display:block !important; width:100% !important; height:48px !important; min-height:48px !important; margin:0 !important; padding:12px 14px !important; box-sizing:border-box !important; border:1px solid #dce4e4 !important; border-radius:11px !important; background:#fff !important; color:#102326 !important; font:400 14px/1.2 DM Sans,Arial,sans-serif !important; outline:none !important; box-shadow:none !important; }
      #learnmateAuth .lm-auth-input:focus { border-color:#59dfc1 !important; box-shadow:0 0 0 3px rgba(89,223,193,.16) !important; }
      #learnmateAuth .lm-auth-message { display:none; margin:0 0 14px !important; padding:10px 12px !important; border-radius:10px !important; font-size:13px !important; background:#fff4f4 !important; color:#b42318 !important; }
      #learnmateAuth .lm-auth-primary { display:block !important; width:100% !important; height:48px !important; min-height:48px !important; margin:0 !important; padding:12px 16px !important; border:0 !important; border-radius:12px !important; background:#083335 !important; color:#fff !important; font:700 15px/1.2 DM Sans,Arial,sans-serif !important; cursor:pointer !important; box-sizing:border-box !important; }
      #learnmateAuth .lm-auth-secondary,#learnmateAuth .lm-auth-close { display:block !important; width:100% !important; margin:0 !important; border:0 !important; background:transparent !important; cursor:pointer !important; box-sizing:border-box !important; }
      #learnmateAuth .lm-auth-secondary { padding:13px !important; color:#536568 !important; font:600 13px/1.2 DM Sans,Arial,sans-serif !important; }
      #learnmateAuth .lm-auth-close { padding:4px !important; color:#9aa6a8 !important; font:400 12px/1.2 DM Sans,Arial,sans-serif !important; }
      @media (max-width:520px) { #learnmateAuth { padding:16px !important; } #learnmateAuth .lm-auth-card { max-height:calc(100dvh - 32px) !important; padding:24px !important; border-radius:20px !important; } }
    `;
    document.head.appendChild(style);
  }

  const modal = document.createElement("div");
  modal.id = "learnmateAuth";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="lm-auth-backdrop" aria-hidden="true"></div>
    <div class="lm-auth-card">
      <div class="lm-auth-header">
        <div class="lm-auth-logo">✦</div>
        <h2 class="lm-auth-title">Welcome to LearnMate</h2>
        <p class="lm-auth-subtitle">Learn anything. Build everything. Grow with AI.</p>
      </div>
      <div class="lm-auth-tabs">
        <button id="lmLoginTab" class="lm-auth-tab active" type="button" onclick="showLoginMode()">Log in</button>
        <button id="lmSignupTab" class="lm-auth-tab" type="button" onclick="showSignupMode()">Sign up</button>
      </div>
      <div id="lmNameGroup" class="lm-auth-field" style="display:none !important;">
        <label class="lm-auth-label" for="lmName">Full name</label>
        <input id="lmName" class="lm-auth-input" type="text" placeholder="Your name" autocomplete="name">
      </div>
      <div class="lm-auth-field">
        <label class="lm-auth-label" for="lmEmail">Email</label>
        <input id="lmEmail" class="lm-auth-input" type="email" placeholder="you@example.com" autocomplete="email">
      </div>
      <div class="lm-auth-field" style="margin-bottom:15px !important;">
        <label class="lm-auth-label" for="lmPassword">Password</label>
        <input id="lmPassword" class="lm-auth-input" type="password" placeholder="Minimum 6 characters" autocomplete="current-password">
      </div>
      <div id="lmAuthMessage" class="lm-auth-message"></div>
      <button id="lmAuthButton" class="lm-auth-primary" type="button" onclick="handleLearnMateAuth()">Log in</button>
      <button class="lm-auth-secondary" type="button" onclick="continueAsGuest()">Continue as guest</button>
      <button class="lm-auth-close" type="button" onclick="closeLearnMateAuth()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
}





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
  position:relative;
  z-index:100000;
  width:min(460px,100%);
  max-width:460px;
  box-sizing:border-box;
  background:#ffffff !important;
  color:#102326 !important;
  border-radius:24px;
  padding:32px;
  box-shadow:0 30px 80px rgba(0,0,0,.35);
  font-family:DM Sans,Arial,sans-serif;
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



          <div style="display:flex;align-items:center;gap:8px">
  <span class="tag">
    ${task.completed ? "Completed" : "Pending"}
  </span>

  <button
    type="button"
    class="ghost-btn"
    onclick="deleteLearnMateTask('${task.id}')"
    style="color:#ff8f8f"
  >
    Delete
  </button>
</div>



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

window.deleteLearnMateTask = async function (taskId) {
  const {
    data: { session }
  } = await learnmateSupabase.auth.getSession();

  if (!session?.user) {
    const index = state.tasks.findIndex(
      t => typeof t === "object" && t.id === taskId
    );

    if (index !== -1) {
      state.tasks.splice(index, 1);
      store.set("lm_tasks", state.tasks);
    }

    toast("Goal removed");
    render();
    return;
  }

  const confirmed = window.confirm(
    "Delete this goal? This cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  const { error } = await learnmateSupabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Task deletion error:", error);
    toast("Could not delete goal");
    return;
  }

  state.tasks = state.tasks.filter(
    t => typeof t === "string" || t.id !== taskId
  );

  store.set("lm_tasks", state.tasks);

  toast("Goal deleted");

  if (state.page === "planner") {
    await loadLearnMatePlannerTasks();
    setTimeout(() => addTaskCompletionControls(), 150);
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
const learnMatePlannerTaskCreator = window.createTask;

setTimeout(() => {
  window.createTask = learnMatePlannerTaskCreator;
}, 0);