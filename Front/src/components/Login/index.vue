<template>
  <div>
    <!-- Button to open the modal login form -->
    <button
      class="btn-login"
      onclick="document.getElementById('id01').style.display='block'"
    >
      Login
    </button>

    <!-- The Modal -->
    <div id="id01" class="modal">
      <span
        onclick="document.getElementById('id01').style.display='none'"
        class="close"
        title="Close Modal"
        >&times;</span
      >

      <!-- Modal Content -->
      <div class="modal-content animate">
        <div class="imgcontainer">
          <img
            src="data:image/jpeg;base64,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"
            alt="Avatar"
            class="avatar"
          />
        </div>

        <div class="login-container">
          <div>
            <label>
              <b>Email</b>
              <input
                type="email"
                placeholder="Enter User email"
                v-model="email"
                required
              />
            </label>
          </div>
          <div>
            <label for="psw"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              v-model="password"
              required
            />
          </div>
          <div class="form-group error" v-if="message">{{ message }}</div>
          <button class="btn-login" @click="submit">Login</button>
          <button class="btn-login" @click="onClick">Sign up</button>

          <div>
            <label>
              <input type="checkbox" checked="checked" name="remember" />
              Remember me
            </label>
          </div>
        </div>

        <div class="login-container" style="background-color: #f1f1f1">
          <button
            type="button"
            onclick="document.getElementById('id01').style.display='none'"
            class="cancelbtn"
          >
            Cancel
          </button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    ...mapActions("auth", ["login", "logout"]),

    async submit() {
      try {
        const user = { email: this.email, password: this.password };
        const result = await this.login(user);

        if (result === true) {
          this.message = "";

          this.$router.push({ path: "/" });
        } else {
          this.message = "Login error!";
        }
      } catch (err) {
        this.message = err.response.data.error;
      }
      this.$router.push({ name: "home" });
    },
    onClick() {
      this.$router.push({ name: "signup" });
    },
  },
  created() {
    this.logout();
  },
};
</script>
<style lang="scss" scoped>
/* Full-width inputs */
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
.btn-login {
  padding: 2px 20px;
}
/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.login-container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
  .login-container {
    color: #000;
  }
}
// .btn-login {
//   width: 50%;
//   background-color: green;
// }
// .cancelbtn {
//   margin: 0 200px 0 0;
//   background-color: red;
// }
/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5px auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 80%; /*
Could be more or less, depending on screen size */
} /* The Close Button */
.close {
  /* Position it in the top right corner outside of the modal */
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
} /* Close button on hover */
.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
} /* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}
@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
