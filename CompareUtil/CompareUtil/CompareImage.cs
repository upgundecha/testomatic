using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.Security.Cryptography;

namespace CompareUtil
{
    public class CompareImage
    {
        public enum Result { Matched, SizeMismatch, PixelMismatch };

        public static Result CompareByPixel(string baseFile, string actualFile)
        {
            Result result = Result.Matched;

            Bitmap baseBmp = (Bitmap)Image.FromFile(baseFile);
            Bitmap actBmp = (Bitmap)Image.FromFile(actualFile);
            
            //Test to see if we have the same size of image
            if (baseBmp.Size != actBmp.Size)
                result = Result.SizeMismatch;
            else
            {
                int height = Math.Min(baseBmp.Height, actBmp.Height);
                int width = Math.Min(baseBmp.Width, actBmp.Width);

                bool are_identical = true;
                for (int x = 0; x <= width - 1; x++)
                {
                    for (int y = 0; y <= height - 1; y++)
                    {
                        if (!baseBmp.GetPixel(x, y).Equals(actBmp.GetPixel(x, y)))
                        {
                            are_identical = false;
                        }
                    }
                }
                if (are_identical == true)
                    result = Result.Matched;
                else
                    result = Result.PixelMismatch;
            }

            return result;
        }

        public static Result CompareByPixel(string baseFile, string actualFile, string diffFile)
        {
            Result result = Result.Matched;

            Bitmap baseBmp = (Bitmap)Image.FromFile(baseFile);
            Bitmap actBmp = (Bitmap)Image.FromFile(actualFile);

            //Test to see if we have the same size of image
            if (baseBmp.Size != actBmp.Size)
            {
                result = Result.SizeMismatch;
            }
            else
            {
                // Make a difference image.
                int height = Math.Min(baseBmp.Height, actBmp.Height);
                int width = Math.Min(baseBmp.Width, actBmp.Width);
                Bitmap diffBmp = new Bitmap(width, height);

                // Create the difference image.
                bool are_identical = true;
                Color eq_color = Color.White;
                Color ne_color = Color.Red;
                for (int x = 0; x <= width - 1; x++)
                {
                    for (int y = 0; y <= height - 1; y++)
                    {
                        if (baseBmp.GetPixel(x, y).Equals(actBmp.GetPixel(x, y)))
                        {
                            diffBmp.SetPixel(x, y, eq_color);
                        }
                        else
                        {
                            diffBmp.SetPixel(x, y, ne_color);
                            are_identical = false;
                        }
                    }
                }

                if (diffFile != "")
                    diffBmp.Save(diffFile);

                if (are_identical == true)
                    result = Result.Matched;
                else
                    result = Result.PixelMismatch;
            }
            return result;
        }

        public static Result CompareByHash(string baseFile, string actualFile)
        {
            Result result = Result.Matched;

            Bitmap baseBmp = (Bitmap)Image.FromFile(baseFile);
            Bitmap actBmp = (Bitmap)Image.FromFile(actualFile);

            //Test to see if we have the same size of image
            if (baseBmp.Size != actBmp.Size)
            {
                result = Result.SizeMismatch;
            }
            else
            {
                //Convert each image to a byte array
                System.Drawing.ImageConverter ic = new System.Drawing.ImageConverter();
                byte[] baseImage = new byte[1];
                byte[] actImage = new byte[1];
                
                baseImage = (byte[])ic.ConvertTo(baseBmp, baseImage.GetType());
                actImage = (byte[])ic.ConvertTo(actBmp, actImage.GetType());

                //Compute a hash for each image
                SHA256Managed shaM = new SHA256Managed();
                byte[] baseHash = shaM.ComputeHash(baseImage);
                byte[] actHash = shaM.ComputeHash(actImage);

                //Compare the hash values
                for (int i = 0; i < baseHash.Length && i < actHash.Length && result == Result.Matched; i++)
                {
                    if (baseHash[i] != actHash[i])
                        result = Result.PixelMismatch;
                }
            }
            return result;
        }
    }
}
