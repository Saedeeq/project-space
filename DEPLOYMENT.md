# Production Deployment Guide

## ✅ Fixed Issues

### 1. File Upload Error (ENOENT)
**Problem:** Upload API was trying to create local directories in serverless environment
**Solution:** Migrated to Vercel Blob for cloud storage

### 2. Login Authentication Error
**Problem:** Password comparison failing in production
**Solution:** Fixed Mongoose document handling and added better error logging

---

## 🔧 Required Vercel Configuration

### 1. Enable Vercel Blob Storage

1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Create Database** → **Blob**
3. Click **Create** to enable Blob storage
4. Vercel will automatically create the `BLOB_READ_WRITE_TOKEN` environment variable

**OR** manually add the environment variable:
- Go to **Settings** → **Environment Variables**
- Add `BLOB_READ_WRITE_TOKEN` with your blob token

### 2. MongoDB Atlas Configuration

1. **Whitelist Vercel IP Addresses:**
   - Go to MongoDB Atlas → Network Access
   - Click **Add IP Address**
   - Choose **Allow Access from Anywhere** (0.0.0.0/0)
   - Or add specific Vercel IP ranges for your region

2. **Verify Connection String:**
   - Ensure `MONGO_URL` in Vercel environment variables is correct
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database`

### 3. Environment Variables Checklist

Make sure these are set in Vercel (**Settings** → **Environment Variables**):

```
MONGO_URL=mongodb+srv://...
BLOB_READ_WRITE_TOKEN=... (auto-created when enabling Blob)
```

---

## 🚀 Deployment Steps

1. **Push to Git:**
   ```bash
   git push origin main
   ```

2. **Vercel will auto-deploy** or trigger manually in Vercel dashboard

3. **Verify deployment:**
   - Check deployment logs in Vercel
   - Test login functionality
   - Test file upload (should now work with Vercel Blob)

---

## 🧪 Testing Checklist

- [ ] Login with valid credentials
- [ ] Register new user
- [ ] Create project with PDF upload
- [ ] Download project PDF
- [ ] View project details
- [ ] Search and filter projects

---

## 📝 Notes

### File Upload Behavior

**Before:** Files stored locally in `/public/uploads/`
**After:** Files stored in Vercel Blob (cloud storage)

- Uploaded files are publicly accessible via blob URLs
- Files are stored with prefix `projects/` for organization
- Maximum file size: 10MB
- Only PDF files allowed

### Database Schema

Existing projects in your database will work fine. New projects with PDFs will store:
- `pdfDocument`: Full Vercel Blob URL (e.g., `https://public.blob.vercel-storage.com/...`)
- `pdfFileName`: Original filename

### Costs

- **Vercel Blob:** Free tier includes 1GB storage, 10GB bandwidth/month
- **MongoDB Atlas:** Free tier (M0) available

---

## 🐛 Troubleshooting

### "Vercel Blob not configured" error
- Enable Blob storage in Vercel dashboard
- Check `BLOB_READ_WRITE_TOKEN` exists in environment variables
- Redeploy after adding environment variables

### "Unable to log in user" error
- Check MongoDB Atlas network access (IP whitelist)
- Verify `MONGO_URL` is correct in Vercel
- Check deployment logs for detailed error messages

### File upload fails
- Verify file is PDF format
- Check file size is under 10MB
- Check Vercel Blob storage is enabled

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Verify all environment variables are set
4. Ensure IP whitelist includes Vercel IPs
