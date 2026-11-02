# Central results setup (faculty only)

**Designated faculty results account:** akakhtar.2024@gmail.com

Create the private results Sheet while signed into this account, or share an existing results Sheet with this address as an Editor. This address is the intended faculty owner/download user, not a password or a browser-side access control. Only Google account permissions can grant access. No access is automatically granted by listing an email here.
1. Create a **private** Google Sheet named MBA 3002 Quiz Results under your own Google account.
2. In the Sheet select Extensions → Apps Script. Paste the contents of apps-script/Code.gs and save.
3. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone**. Authorize Google access.
4. Copy the web app URL ending in /exec. In config.js, set window.QUIZ_SUBMISSION_URL to that URL and commit.
5. Open the published quiz website and test with a dummy student. Verify the row appears in the private Sheet.
6. In Google Sheets select File → Download → Microsoft Excel (.xlsx) to obtain all submissions.
7. Restrict Sheet sharing to the faculty account. Never place a faculty password in GitHub or browser JavaScript.

## Security and limitations
This is for **low-stakes quizzes only**. Public Apps Script endpoints do not authenticate students, and a browser-based timer/answer key can be bypassed. Scores and identities can be spoofed. Do not treat this as a secure proctored examination. Do not deploy a public admin page or store passwords in code. Faculty access is controlled by Google account permissions on the private Sheet, not by the AMIR username. The user's supplied password is intentionally not stored or used. For high-stakes exams, use a server-side authenticated assessment platform.
