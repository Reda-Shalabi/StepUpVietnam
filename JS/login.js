const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });

      function toggleMenu() {
  const navList = document.querySelector('.list-nav ul');
  const overlay = document.getElementById('menu-overlay');
  navList.classList.toggle('active');
  if (navList.classList.contains('active')) {
    overlay.classList.add('active');
    overlay.style.display = 'block';
  } else {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
}