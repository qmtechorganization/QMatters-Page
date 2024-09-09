using Microsoft.AspNetCore.Mvc;

namespace Q_MATTERS.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
