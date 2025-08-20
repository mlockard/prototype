/**
 * Subscription Form Prototype Interactions
 * - Theme management (persisted)
 * - Form validation (HTML5 + custom)
 * - Password visibility toggles
 * - Confirmation screen swap
 */
(function(){try{const s=localStorage.getItem("theme");if(s==="light"||s==="dark"){document.documentElement.setAttribute("data-theme",s);}}catch(_){}})();
document.addEventListener("DOMContentLoaded",()=>{
  const themeBtn=document.getElementById("themeToggle");
  const form=document.getElementById("regForm");
  const confirmView=document.getElementById("confirmation");
  const formView=document.getElementById("formView");
  const password=document.getElementById("password");
  const confirmPassword=document.getElementById("confirmPassword");
  const showPwBtn=document.getElementById("showPw");
  const showPw2Btn=document.getElementById("showPw2");

  if(themeBtn){
    // Initialize theme if not set
    if(!document.documentElement.getAttribute("data-theme")){
      document.documentElement.setAttribute("data-theme","light");
    }
    // Set initial aria-pressed state
    const initialTheme=document.documentElement.getAttribute("data-theme");
    themeBtn.setAttribute("aria-pressed",String(initialTheme==="dark"));

    themeBtn.addEventListener("click",()=>{
      const current=document.documentElement.getAttribute("data-theme");
      const isDark=current==="dark";
      const next=isDark?"light":"dark";
      document.documentElement.setAttribute("data-theme",next);
      try{localStorage.setItem("theme",next);}catch(_){}
      themeBtn.setAttribute("aria-pressed",String(next==="dark"));
    });
  }

  function toggleVis(input,btn){
    const isText=input.type==="text";
    input.type=isText?"password":"text";
    btn.setAttribute("aria-pressed",String(!isText));
    const labelEl=btn.querySelector(".label");
    if(labelEl){labelEl.textContent=isText?"Show":"Hide";}
  }
  if(showPwBtn){showPwBtn.addEventListener("click",()=>toggleVis(password,showPwBtn));}
  if(showPw2Btn){showPw2Btn.addEventListener("click",()=>toggleVis(confirmPassword,showPw2Btn));}

  function setFieldError(field,message){
    const msgEl=document.getElementById(field.id+"Error");
    if(message){field.setAttribute("aria-invalid","true"); if(msgEl){msgEl.textContent=message; msgEl.hidden=false;}}
    else{field.removeAttribute("aria-invalid"); if(msgEl){msgEl.textContent=""; msgEl.hidden=true;}}
  }

  function validateForm(){
    let valid=true;
    const name=document.getElementById("fullName");
    const email=document.getElementById("email");
    const plan=document.querySelector('input[name="plan"]:checked');

    if(!name.value.trim()){ setFieldError(name,"Please enter your full name."); valid=false;} else { setFieldError(name,""); }
    if(!email.value.trim()){ setFieldError(email,"Please enter your email address."); valid=false;}
    else if(!email.checkValidity()){ setFieldError(email,"Enter a valid email (e.g., name@school.edu)."); valid=false;}
    else { setFieldError(email,""); }

    const pw=password.value;
    if(pw.length<8){ setFieldError(password,"Password must be at least 8 characters."); valid=false;} else { setFieldError(password,""); }
    if(confirmPassword.value!==pw){ setFieldError(confirmPassword,"Passwords do not match."); valid=false;} else { setFieldError(confirmPassword,""); }

    const planError=document.getElementById("planError");
    if(!plan){ planError.hidden=false; valid=false; } else { planError.hidden=true; }

    if(!valid){
      const firstInvalid=document.querySelector('[aria-invalid="true"], #planError:not([hidden])');
      if(firstInvalid){
        if(firstInvalid.id==="planError"){ document.getElementById("planLegend").focus(); }
        else { firstInvalid.focus(); }
      }
    }
    return valid;
  }

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(!validateForm()) return;
    const planEl=document.querySelector('input[name="plan"]:checked');
    const plan=planEl ? planEl.value : "Basic";
    document.getElementById("confName").textContent=(document.getElementById("fullName").value||"").trim();
    document.getElementById("confEmail").textContent=(document.getElementById("email").value||"").trim();
    document.getElementById("confPlan").textContent=plan;
    formView.hidden=true; confirmView.hidden=false; confirmView.scrollIntoView({behavior:"smooth",block:"start"});
    document.getElementById("confHeading").focus();
  });

  const editInfoBtn=document.getElementById("editInfo");
  if(editInfoBtn){editInfoBtn.addEventListener("click",()=>{
    confirmView.hidden=true; formView.hidden=false; document.getElementById("fullName").focus();
  });}
});