package com.srs.common.utils;

import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.Security;
import java.util.Arrays;
import java.util.Base64;

/**
 * Crypto utility
 * Supports SM4, AES, MD5 encryption
 */
@Slf4j
public class CryptoUtil {

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    private static final String SM4_ALGORITHM = "SM4";
    private static final String AES_ALGORITHM = "AES";
    private static final String AES_MODE = "AES/CBC/PKCS5Padding";

    /**
     * SM4 encryption
     */
    public static String sm4Encrypt(String plaintext, String key) {
        try {
            byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
            byte[] plaintextBytes = plaintext.getBytes(StandardCharsets.UTF_8);

            Cipher cipher = Cipher.getInstance(SM4_ALGORITHM, BouncyCastleProvider.PROVIDER_NAME);
            SecretKeySpec secretKey = new SecretKeySpec(padKey(keyBytes, 16), SM4_ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            byte[] encrypted = cipher.doFinal(plaintextBytes);
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            log.error("SM4 encryption failed", e);
            throw new RuntimeException("SM4 encryption failed", e);
        }
    }

    /**
     * SM4 decryption
     */
    public static String sm4Decrypt(String ciphertext, String key) {
        try {
            byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
            byte[] ciphertextBytes = Base64.getDecoder().decode(ciphertext);

            Cipher cipher = Cipher.getInstance(SM4_ALGORITHM, BouncyCastleProvider.PROVIDER_NAME);
            SecretKeySpec secretKey = new SecretKeySpec(padKey(keyBytes, 16), SM4_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);

            byte[] decrypted = cipher.doFinal(ciphertextBytes);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("SM4 decryption failed", e);
            throw new RuntimeException("SM4 decryption failed", e);
        }
    }

    /**
     * AES encryption with IV
     */
    public static String aesEncrypt(String plaintext, String key, String iv) {
        try {
            byte[] keyBytes = padKey(key.getBytes(StandardCharsets.UTF_8), 16);
            byte[] ivBytes = padKey(iv.getBytes(StandardCharsets.UTF_8), 16);

            Cipher cipher = Cipher.getInstance(AES_MODE);
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, AES_ALGORITHM);
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);

            byte[] encrypted = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            log.error("AES encryption failed", e);
            throw new RuntimeException("AES encryption failed", e);
        }
    }

    /**
     * AES decryption with IV
     */
    public static String aesDecrypt(String ciphertext, String key, String iv) {
        try {
            byte[] keyBytes = padKey(key.getBytes(StandardCharsets.UTF_8), 16);
            byte[] ivBytes = padKey(iv.getBytes(StandardCharsets.UTF_8), 16);

            Cipher cipher = Cipher.getInstance(AES_MODE);
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, AES_ALGORITHM);
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);

            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("AES decryption failed", e);
            throw new RuntimeException("AES decryption failed", e);
        }
    }

    /**
     * MD5 hash
     */
    public static String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            log.error("MD5 hash failed", e);
            throw new RuntimeException("MD5 hash failed", e);
        }
    }

    /**
     * MD5 hash with salt
     */
    public static String md5Salt(String input, String salt) {
        return md5(md5(input) + salt);
    }

    /**
     * SHA-256 hash
     */
    public static String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            log.error("SHA-256 hash failed", e);
            throw new RuntimeException("SHA-256 hash failed", e);
        }
    }

    /**
     * Password encryption with SM4 + MD5 salt
     */
    public static String encryptPassword(String password, String salt) {
        return md5Salt(sm4Encrypt(password, salt), salt);
    }

    /**
     * Pad key to specified length
     */
    private static byte[] padKey(byte[] key, int length) {
        if (key.length >= length) {
            return Arrays.copyOf(key, length);
        }
        byte[] padded = new byte[length];
        System.arraycopy(key, 0, padded, 0, key.length);
        return padded;
    }
}
