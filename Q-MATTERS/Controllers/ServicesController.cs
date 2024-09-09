using Microsoft.AspNetCore.Mvc;

namespace Q_MATTERS.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
