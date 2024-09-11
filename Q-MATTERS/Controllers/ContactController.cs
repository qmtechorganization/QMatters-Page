using Microsoft.AspNetCore.Mvc;
using Q_MATTERS.Data;
using Q_MATTERS.Models;

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
        public async Task<ActionResult> SendContactEmail(string name, string email,string phone,string company,string subject, string message)
        {
            try
            {
                // Send email
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
                ex.Message.ToString();
                throw;
            }
            
            return RedirectToAction("Index");
        }
    }
}
