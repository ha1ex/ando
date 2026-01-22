<?php
/**
 * Password Reset Script for ANDO JV
 *
 * Generates a new password and sends it to the user's email.
 * TODO: Add database integration to actually change the password in Supabase.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Неверный email']);
    exit;
}

// Generate new password (8 characters: letters + numbers)
$newPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);

// TODO: Update password in Supabase database
// This requires either:
// 1. Direct PostgreSQL connection with connection string
// 2. Supabase Admin API with service_role key
//
// Example with PostgreSQL:
// $db = pg_connect("host=db.xxx.supabase.co dbname=postgres user=postgres password=***");
// pg_query_params($db, "UPDATE auth.users SET encrypted_password = crypt($2, gen_salt('bf')) WHERE email = $1", [$email, $newPassword]);

// Email content
$subject = "=?UTF-8?B?" . base64_encode("Новый пароль ANDO") . "?=";
$message = "Здравствуйте!\n\n";
$message .= "Вы запросили сброс пароля на сайте andojv.com\n\n";
$message .= "Ваш новый пароль: $newPassword\n\n";
$message .= "После входа рекомендуем сменить пароль в личном кабинете.\n\n";
$message .= "Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.\n\n";
$message .= "---\n";
$message .= "ANDO JV\n";
$message .= "https://andojv.com";

$headers = "From: noreply@andojv.com\r\n";
$headers .= "Reply-To: info@andojv.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$sent = mail($email, $subject, $message, $headers);

if ($sent) {
    // Log for debugging (remove in production)
    error_log("Password reset email sent to: $email, new password: $newPassword");

    echo json_encode([
        'success' => true,
        'message' => 'Новый пароль отправлен на email'
    ]);
} else {
    error_log("Failed to send password reset email to: $email");

    echo json_encode([
        'success' => false,
        'error' => 'Не удалось отправить email. Попробуйте позже.'
    ]);
}
