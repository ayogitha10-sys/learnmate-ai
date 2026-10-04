// =========================================================
// LEARNMATE AI - SUPABASE AUTHENTICATION
// =========================================================

// Your LearnMate Supabase project URL
const SUPABASE_URL = "https://gkjjpehdrbbyuvwasdjp.supabase.co";

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

    go("dashboard");

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

    state.user = {
      name: data.full_name || "Learner",
      goal: data.career_goal || "Learner"
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

    go("dashboard");

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