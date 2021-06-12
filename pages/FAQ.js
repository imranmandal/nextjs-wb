import Layout from "@/components/Layout";
import FAQuestion from "@/components/FAQuestion";

function FAQ() {
  return (
    <>
      <Layout title="FAQ">
        <div className="page">
          <h1>FAQ</h1>
          <div>
            <FAQuestion
              title="What is Would Bee?"
              para1="Would Bee is a Truly Free Matrimony service. Other popular services such as Shaadi.com, Jeevansathi, Bharat Matrimony, etc. allow users to register for free but ask for money to connect with your potential matches. Not Us !"
            />
            <FAQuestion
              title="How can I register on Would Bee?"
              para1="Click on the link provided on Home Page to download the app."
              para2="Open the app, Sign Up using your mobile number and email id. Next fill the registration form and that's it!"
            />
            <FAQuestion
              title="My Religion/Caste/Mother tongue/Occupation is not listed in the Registration form. What should I do?"
              para1="Would Bee has tried to be as inclusive as possible. However, it may happen that your particular religion / caste, mother tongue, education, profession, or something else is not represented."
              para2="In such a case we request that you use the 'Other' option wherever applicable. Also, you can send an email to support@wouldbee.com, clearly listing the new addition you would like us to make to the Registration form. While we do not guarantee that your suggestion will be Accepted, we will try our best to ensure that it does."
            />
            <FAQuestion
              title="Are there any specific DOs and DON'Ts while creating a matchmaking Profile on Would Bee?"
              para1="Do not use your Profile to display your contact details. Do not make commercial use of it and do not include content that is vulgar, pornographic, racist, or offensive in any manner to anyone. See our terms of use/service agreement for more details of what type of content is prohibited on Would Bee."
              para2="Be as detailed as possible while creating your Profile. Do upload a Govt. Photo ID proof as verified profiles get 20x more matches. Once your Profile is activated, be sure to fill in the Partner Preference and also to upload more photographs of you. It will definitely help your chances of finding a partner."
            />
            <FAQuestion
              title="Why should I set my Partner Preference?"
              para1="Setting your Partner Preferences tells us more about the kind of partner you are looking for and helps us suggest better matches for you. Also, your Preference helps other Members decide if you will be interested or not if they were to contact you."
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FAQ;
