# Supabase Email Authentication Setup Guide

## Issue: "Error sending confirmation email"

This error occurs when Supabase's email service is not properly configured. Here's how to fix it:

## 1. Supabase Dashboard Configuration

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: `ipmihvbfjvuhnuwladhy`

### Step 2: Configure Email Settings
1. Navigate to **Authentication** → **Settings**
2. Scroll down to **SMTP Settings**
3. Configure one of the following options:

#### Option A: Use Supabase's Built-in Email (Recommended for Development)
1. In **Auth Settings**, ensure **Enable email confirmations** is checked
2. Set **Site URL** to: `http://localhost:3000` (for development)
   - For production: `https://nexium-resume-tailor-theta.vercel.app`
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://nexium-resume-tailor-theta.vercel.app/auth/callback` (for production)
   - `https://your-production-domain.com/auth/callback` (for later)

#### Option B: Configure Custom SMTP (For Production)
1. Enable **Enable custom SMTP**
2. Fill in your SMTP provider details:
   - **SMTP Host**: (e.g., smtp.gmail.com)
   - **SMTP Port**: (e.g., 587)
   - **SMTP User**: your-email@gmail.com
   - **SMTP Pass**: your-app-password
   - **SMTP Sender Name**: Resume Tailor AI
   - **SMTP Sender Email**: your-email@gmail.com

### Step 3: Email Templates
1. Go to **Authentication** → **Email Templates**
2. Customize the **Magic Link** template:
   ```html
   <h2>Welcome to Resume Tailor AI!</h2>
   <p>Click the link below to sign in:</p>
   <p><a href="{{ .ConfirmationURL }}">Sign In to Resume Tailor AI</a></p>
   <p>If you didn't request this, you can safely ignore this email.</p>
   ```

## 2. Development Workarounds

### Option 1: Use Test Email Providers
For development, you can use services like:
- **Mailtrap** (recommended for testing)
- **Ethereal Email** (temporary test emails)
- **Gmail** with app passwords

### Option 2: Disable Email Confirmation (Development Only)
1. In Supabase Dashboard → **Authentication** → **Settings**
2. Uncheck **Enable email confirmations**
3. This allows users to sign up without email verification (not recommended for production)

## 3. Alternative Authentication Methods

If email continues to be problematic, consider these alternatives:

### Social Authentication
1. Enable **Google** or **GitHub** authentication in Supabase
2. Update the login page to include social login buttons

### Phone Authentication
1. Enable **Phone** authentication in Supabase
2. Configure SMS provider (Twilio, etc.)

## 4. Testing Email Configuration

### Test with a Real Email
1. Use your personal email address
2. Check spam/junk folders
3. Verify the magic link works

### Check Supabase Logs
1. Go to **Logs** → **Auth Logs** in Supabase Dashboard
2. Look for email sending errors
3. Check rate limits and quotas

## 5. Common Issues and Solutions

### Issue: "Invalid login credentials"
- **Solution**: User needs to click the magic link first before the account is created

### Issue: "Email rate limit exceeded"
- **Solution**: Wait a few minutes between email requests

### Issue: "Invalid redirect URL"
- **Solution**: Ensure `http://localhost:3000/auth/callback` is added to allowed redirect URLs

### Issue: "SMTP authentication failed"
- **Solution**: Check SMTP credentials and enable "Less secure app access" for Gmail

## 6. Production Considerations

### Domain Verification
1. Add your production domain to Supabase settings
2. Configure proper DNS records if using custom domain
3. Set up SSL certificates

### Email Deliverability
1. Use a dedicated email service (SendGrid, Mailgun, etc.)
2. Configure SPF, DKIM, and DMARC records
3. Monitor email delivery rates

## 7. Environment Variables Check

Ensure your `.env.local` has the correct values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ipmihvbfjvuhnuwladhy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 8. Quick Fix for Development

If you need to test the app immediately:

1. **Disable email confirmation** in Supabase (temporarily)
2. **Use social login** (Google/GitHub) instead
3. **Create users manually** in Supabase dashboard for testing

## Need Help?

If you continue to experience issues:
1. Check Supabase status page
2. Review Supabase documentation
3. Contact Supabase support
4. Check community forums

Remember to re-enable email confirmation before deploying to production!