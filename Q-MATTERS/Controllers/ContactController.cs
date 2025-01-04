using Microsoft.AspNetCore.Mvc;
using Q_MATTERS.Data;
using Q_MATTERS.Models;
using System.Text.RegularExpressions;

namespace Q_MATTERS.Controllers
{
    public class ContactController : Controller
    {
        private readonly QMContext _db;
        public ContactController(QMContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> SendContactEmail(string name, string email, string phone, string company, string subject, string message, string honeypot)
        {
            if (!string.IsNullOrEmpty(honeypot))
            {
                return BadRequest("Solicitud inválida.");
            }

            if (string.IsNullOrWhiteSpace(name) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(subject) ||
                string.IsNullOrWhiteSpace(message))
            {
                return BadRequest("Todos los campos requeridos deben ser completados.");
            }

            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(email))
            {
                return BadRequest("El formato del correo electrónico no es válido.");
            }

            var phoneRegex = new Regex(@"^\+?[0-9\s\-\(\)]{7,15}$");
            if (!string.IsNullOrWhiteSpace(phone) && !phoneRegex.IsMatch(phone))
            {
                return BadRequest("El formato del número de teléfono no es válido.");
            }

            try
            {
                var sendMail = new SendMail(_db)
                {
                    Subject = subject,
                    Body = $"<!DOCTYPE html><html><head><title>Campestra</title></head>" +
                           $"<body><h1>{subject}</h1><p>{message}</p>" +
                           $"<p>My name is {name}</p><p>you can contact me at my Email: {email}</p><p> or at my Phone: {phone}</p><p> I work for {company}</p>" +
                           "Best Regards</body></html>"
                };

                await sendMail.SendEmailGeneric();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar el correo: {ex.Message}");
                return StatusCode(500, "Ocurrió un error al enviar el mensaje.");
            }

            return RedirectToAction("Index");
        }

        //[HttpPost]
        //public async Task<ActionResult> SendContactEmail(string name, string email, string phone, string company, string subject, string message)
        //{
        //    try
        //    {
        //        // Send email
        //        var sendMail = new SendMail(_db)
        //        {
        //            Subject = subject,
        //            Body = $"<!DOCTYPE html><html><head><title>Campestra</title></head>" +
        //            $"<body><h1>{subject}</h1><p>{message}</p>" +
        //            $"<p>My name is {name}</p><p>you can contact me at my Email: {email}</p><p> or at my Phone: {phone}</p><p> I work for {company}</p>" +
        //            "Best Regards</body></html>"

        //        };

        //        await sendMail.SendEmailGeneric();
        //    }
        //    catch (Exception ex)
        //    {
        //        ex.Message.ToString();
        //        throw;
        //    }

        //    return RedirectToAction("Index");
        //}

    }
}
