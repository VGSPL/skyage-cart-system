import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeLetter.css";

const WelcomeLetter = () => {

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user")) || {
fullname: "New Member",
username: "demo123",
password: "demo@123"
};

return (

<div className="letter-wrapper">

<div className="letter-card">

<div className="left-strip"></div>

{/* HEADER */}

<div className="header">

<div className="header-text">
<h1>Daniel Gallego</h1>
<p>Marketing Manager</p>
</div>

<div className="header-photo">
<img src="/profile.png" alt="profile"/>
</div>

</div>

{/* CONTENT */}

<div className="content">

<p><b>Username:</b> {user.username}</p>

<p className="password"><b>Password:</b> {user.password}</p>

<p className="dear"><b>Dear {user.fullname},</b></p>

<p>
Welcome to <b>Skyage!</b> We are absolutely thrilled to have you as part of our growing community.
Your registration is now complete, and we cannot wait for you to explore everything we have to offer.
</p>

<p>
As a valued member, you now have access to our exclusive referral program — one of the most rewarding
ways to save on every order you place with us. Simply share your personal referral link with friends,
family, or colleagues, and earn rewards every time someone joins through you.
</p>

<p className="section-title"><b>How the Referral Program Works:</b></p>

<ul className="ref-list">
<li>Share your unique referral link with anyone you know.</li>

<li>
When they register and complete their first purchase, you both receive [X] credits instantly.
</li>

<li>
Track all your referrals and pending rewards from your member dashboard.
</li>
</ul>

<p className="section-title"><b>Your Referral Link</b></p>

<p className="center-text"><b>Your Personal Referral Link</b></p>

<p className="ref-link">
<a href="https://skyage.co.in/ref/15df51" target="_blank" rel="noreferrer">
https://skyage.co.in/ref/15df51
</a>
</p>

<p>
There is no limit to how much you can earn — the more you share, the more you save.
We have also lined up exclusive member-only deals and early access to upcoming sales.
</p>

<p>
Should you ever have questions, our support team is always happy to help.
You can reach us at <b>support@skyage.co.in</b>
</p>

<p>
Once again, welcome aboard. We look forward to being a part of your journey!
</p>

<p className="regards">Best Regards,</p>

<p className="founder"><b>Founder / CEO Name</b></p>

<p className="company"><b>Skyage.co.in</b></p>

</div>

{/* FOOTER */}

<div className="footer">

    <div className="contact">

<h4>Contact</h4>

<p>📞 Contact Number</p>

<p>📧 support@skyage.co.in</p>

<p>
🌐 
<a href="https://www.skyage.co.in" target="_blank" rel="noreferrer">
www.skyage.co.in
</a>
</p>

</div>

<div className="signature">

<img src="/signature.png" alt="signature"/>

<p>Daniel Gallego</p>

</div>

</div>

{/* BUTTON */}

<div className="update-btn-wrapper">

<button
className="update-btn"
onClick={() => navigate("/update-profile")}
>
Proceed to Update Info
</button>

</div>

</div>

</div>

);

};

export default WelcomeLetter;