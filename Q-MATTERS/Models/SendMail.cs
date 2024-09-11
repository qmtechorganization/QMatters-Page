using Microsoft.EntityFrameworkCore;
using Q_MATTERS.Data;

namespace Q_MATTERS.Models
{
    public class SendMail
    {
        public string Profile_name { get; set; } = "qmatters";
        public string Recipients { get; set; } = "contact@q-matters.com";
        public string Copy_recipients { get; set; } = "contact@q-matters.com;";
        public string Body { get; set; } = "Test";
        public string Body_format { get; set; } = "HTML";
        public string Subject { get; set; } = "Test";      

        private readonly QMContext _db;
        public SendMail(QMContext db)
        {
            _db =db;
        }       
        public async Task SendEmailGeneric()
        {
            try
            {
                var email = await _db.Database.ExecuteSqlRawAsync("EXEC dbo.[spSendEmail]  @recipients = {0}, @copy_recipients = {1}, @body = {2}, @body_format = {3}, @subject = {4}", Recipients, Copy_recipients, Body, Body_format, Subject);

            }
            catch (Exception ex)
            {
                ex.InnerException.ToString();

            }
        }

    }
}
