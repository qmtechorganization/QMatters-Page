using Microsoft.AspNetCore.Mvc;

namespace Q_MATTERS.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public ActionResult SendContactEmail(string name, string email, string message)
        {
            // Send email
            return RedirectToAction("Index");
        }
    }
}
